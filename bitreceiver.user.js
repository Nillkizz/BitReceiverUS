// ==UserScript==
// @name         BitReceiver
// @namespace    Nillkizz
// @version      0.1.4
// @homepage     https://github.com/Nillkizz/BitReceiverUS/
// @homepageURL  https://github.com/Nillkizz/BitReceiverUS/
// @updateURL    https://github.com/Nillkizz/BitReceiverUS/raw/main/bitreceiver.user.js
// @downloadURL  https://github.com/Nillkizz/BitReceiverUS/raw/main/bitreceiver.user.js
// @description  Recive all requests
// @author       Nillkizz
// @include      http://zergbit.net/dashboard/buy/
// @icon         http://zergbit.net/static/zergbit.ico
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const config = {
    paymentSystems: [
      'Сбербанк',
      'Тинькоф'
    ],
    delay: 0
  };

  const obs = new MutationObserver(cb);
  obs.observe(document.getElementById('confirm_trade_table'), { childList: true });

  function cb(mutationList, observer) {
    processMutations(mutationList);
  }

  function processMutations(mutations) {
    for (const mutation of mutations) {
      switch (mutation.type) {
        case "childList":
          if (mutation.addedNodes.length > 0) {
            processAddedNodes(mutation.addedNodes);
          }
          break;

        default:
          console.log(`Mutation type: ${mutation.type}`);
      }
    }

  }

  function processAddedNodes(nodes) {
    for (const node of nodes) {
      switch (node.tagName) {
        case "TBODY":
          const result = processRequestTBODY(node);
          if (config.paymentSystems instanceof Array) {
            if (!config.paymentSystems.includes(result.data.toSend[1])) return;
          }
          console.log(result);
          break;

        default:
          console.log(`Node tag name: ${node.tagName}`);
      }
    }
  }

  function processRequestTBODY(node) {
    const [status, id, req, comment, toSend, toReceive, course, date] = Array.from(node.querySelectorAll('td'))
      .map((el, i) => {
        switch (i) {
          case 0: case 1: case 2: case 3:
            return el.textContent;
          case 4: case 7:
            return [el.childNodes[0].textContent, el.querySelector('span').textContent];
          case 5: case 6:
            return [el.childNodes[0].textContent, el.childNodes[2].textContent];
        }
      })
    node.data = { status, id, req, comment, toSend, toReceive, course, date };
    return node;
  }
})();