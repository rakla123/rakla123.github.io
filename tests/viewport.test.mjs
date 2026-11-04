import assert from 'node:assert/strict';
import {test} from 'node:test';
import {readViewportSignature} from '../public/skymapper/viewport.mjs';
function viewer() {
  return {getFov:()=>[60,30],getRaDec:()=>[20,10],getRotation:()=>0,getProjectionName:()=> 'AIT', world2pix:(ra,dec)=>[ra,dec]};
}
test('detects a delayed projection transform even when public view parameters remain unchanged',()=>{
 const view=viewer();const before=readViewportSignature(view,800,600);
 view.world2pix=(ra,dec)=>[ra*2,dec*3];
 assert.notEqual(readViewportSignature(view,800,600),before);
});
test('detects container resize, projection change, and stable idle views',()=>{
 const view=viewer();const before=readViewportSignature(view,800,600);
 assert.equal(readViewportSignature(view,800,600),before);
 assert.notEqual(readViewportSignature(view,900,600),before);
 view.getProjectionName=()=> 'SIN';
 assert.notEqual(readViewportSignature(view,800,600),before);
});
test('handles invalid or out-of-view projection samples without failing rendering',()=>{
 const view=viewer();view.world2pix=()=>null;
 assert.ok(readViewportSignature(view,800,600).includes('outside'));
 view.world2pix=()=>{throw Error('outside');};
 assert.ok(readViewportSignature(view,800,600).includes('outside'));
});
