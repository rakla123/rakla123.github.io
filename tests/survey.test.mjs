import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolveSurveyUrl, DSS_MIRRORS } from '../public/skymapper/survey.mjs';
const metadata = 'hips_order = 9\nhips_frame = equatorial\n';
function response(url) { return url.endsWith('/properties') ? new Response(metadata) : new Response(new Uint8Array([255,216,255,217])); }
test('DSS uses a working registered mirror and preserves custom surveys', async () => {
  assert.equal(await resolveSurveyUrl('P/DSS2/color', {fetchImpl: async url => response(url)}), DSS_MIRRORS[0]);
  assert.equal(await resolveSurveyUrl('CDS/P/DSS2/color', {fetchImpl: async url => response(url)}), DSS_MIRRORS[0]);
  assert.equal(await resolveSurveyUrl('custom', {fetchImpl: () => {throw Error('must not fetch');}}), 'custom');
});
test('DSS retries when metadata works but tiles fail', async () => {
  const attempts = [];
  const url = await resolveSurveyUrl('P/DSS2/color', { mirrors: ['https://bad', 'https://good'], fetchImpl: async url => {
    attempts.push(url);
    return url.startsWith('https://bad') && url.endsWith('.jpg') ? new Response('unavailable', {status:503}) : response(url);
  }});
  assert.equal(url, 'https://good');
  assert.equal(attempts.length, 4);
});
test('DSS rejects HTML responses masquerading as successful tiles', async () => {
  await assert.rejects(resolveSurveyUrl('P/DSS2/color', {mirrors:['https://bad'],fetchImpl:async url => url.endsWith('.jpg') ? new Response('<html>Error</html>') : response(url)}), /Sky background unavailable/);
});
test('DSS times out a stalled response body and tries the next mirror', async () => {
  const url = await resolveSurveyUrl('P/DSS2/color', { mirrors: ['https://slow','https://good'], timeoutMs:10, fetchImpl:async (url,{signal}) => {
    if(url.startsWith('https://good')) return response(url);
    return {ok:true,text:()=>new Promise((resolve,reject)=>signal.addEventListener('abort',()=>reject(Error('aborted')))),arrayBuffer:()=>new Promise((resolve,reject)=>signal.addEventListener('abort',()=>reject(Error('aborted'))))};
  }});
  assert.equal(url,'https://good');
});
