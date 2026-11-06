import assert from 'node:assert/strict';
import {test} from 'node:test';
import {BACKGROUND_SURVEYS, resolveSurveyUrl} from '../public/skymapper/survey.mjs';
test('each background validates its own frame and order',async()=>{
 for(const survey of BACKGROUND_SURVEYS){
  const url=await resolveSurveyUrl(survey.id,{fetchImpl:async url=>url.endsWith('/properties')?new Response(`hips_order = ${survey.order}\nhips_frame = ${survey.frame}\n`):new Response(new Uint8Array([255,216,255,217]))});
  assert.equal(url,survey.mirrors[0]);
 }
});
