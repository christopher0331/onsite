/**
 * Paste into lead-valuator (Replit) index.html before </body>, or import once in the app entry:
 *   <script src="https://www.onsiteregroup.com/evaluation-iframe-resize.js"></script>
 * Notifies the parent page whenever the form height changes.
 */
(function () {
  if (window.self === window.top) return;

  function measure() {
    var root = document.getElementById("root");
    return Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
      root ? root.scrollHeight : 0,
      root ? root.offsetHeight : 0
    );
  }

  function notify() {
    window.parent.postMessage(
      { type: "onsite-iframe-resize", height: measure() },
      "*"
    );
  }

  notify();
  window.addEventListener("load", notify);
  window.addEventListener("resize", notify);

  if (typeof ResizeObserver !== "undefined") {
    var ro = new ResizeObserver(notify);
    ro.observe(document.documentElement);
    if (document.body) ro.observe(document.body);
    var root = document.getElementById("root");
    if (root) ro.observe(root);
  }

  // Catch late React renders / conditional form steps
  var interval = setInterval(notify, 400);
  setTimeout(function () {
    clearInterval(interval);
  }, 120000);
})();
