// ==UserScript==
// @name         BitReceiver
// @namespace    Nillkizz
// @version      0.2.0
// @homepage     https://github.com/Nillkizz/BitReceiverUS/
// @homepageURL  https://github.com/Nillkizz/BitReceiverUS/
// @updateURL    https://github.com/Nillkizz/BitReceiverUS/raw/main/bitreceiver.user.js
// @downloadURL  https://github.com/Nillkizz/BitReceiverUS/raw/main/bitreceiver.user.js
// @description  Receive all requests
// @author       Nillkizz
// @include      http://zergbit.net/dashboard/buy/
// @icon         http://zergbit.net/static/zergbit.ico
// @grant        none
// ==/UserScript==

(function () {
  'use strict';
  const buyedIds = [];

  const config = {
    paymentSystems: [
      'Сбербанк',
      'Tinkoff'
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
          const tbody = processRequestTBODY(node);
          if (config.paymentSystems instanceof Array) {
            if (!config.paymentSystems.includes(result.data.toSend[1])) return;
          }
          console.log(tbody);

          const id = /# (\d*)/.exec(tbody.data.id)[1];
          if (buyedIds.includes(id)) {
            console.log("Skipped deal id:", id);
            return;
          }

          accept_buy_deal(parseInt(id))
          buyedIds.push(id)
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