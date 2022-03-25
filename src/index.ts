import { handleRequest,handleScheduled } from './handler'

addEventListener('fetch', (event) => {
  handleScheduled(event)
  event.respondWith(handleRequest(event.request))
})


addEventListener('scheduled', event => {
  event.waitUntil(handleScheduled(event));
});