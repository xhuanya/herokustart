/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/handler.ts":
/*!************************!*\
  !*** ./src/handler.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.handleScheduled = exports.handleRequest = void 0;
async function handleRequest(request) {
    return new Response(`request method: ${request.method}`);
}
exports.handleRequest = handleRequest;
async function handleScheduled(event) {
    var flag = false;
    var Runtask = [];
    //任务队列
    var taskList = await MykvDB.get('task', 'json') || [];
    if (taskList.length == 0) {
        var allSite = await MykvDB.get('all', 'json') || [];
        console.log('空数据写入', '全部任务', allSite);
        taskList = allSite;
    }
    console.log(taskList);
    for (var i = 0; i < 49; i++) {
        let data = taskList[i];
        if (!data) {
            continue;
        }
        let now = new Date().getDate();
        if (data.start < now && data.end > now) {
            Runtask.push(new Promise(function (suc, fail) {
                fetch(data.url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36 Edg/99.0.1150.46' }, method: 'GET' }).then(rs => {
                    console.log('请求完成', data.url, rs);
                    suc(rs);
                }).catch(err => fail(err));
            }));
        }
    }
    if (taskList.length > 50) {
        await MykvDB.put('task', JSON.stringify(taskList.splice(50)));
    }
    event.waitUntil(Promise.all(Runtask));
}
exports.handleScheduled = handleScheduled;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const handler_1 = __webpack_require__(/*! ./handler */ "./src/handler.ts");
addEventListener('fetch', (event) => {
    handler_1.handleScheduled(event);
    event.respondWith(handler_1.handleRequest(event.request));
});
addEventListener('scheduled', event => {
    event.waitUntil(handler_1.handleScheduled(event));
});

})();

/******/ })()
;
//# sourceMappingURL=worker.js.map