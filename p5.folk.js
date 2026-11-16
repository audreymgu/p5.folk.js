const defaultAddress = "http://folk-hex.lan:4273/ws";

function loadFolk(p5, fn, lifecycles) {
  fn.connectFolk = function (address = defaultAddress) {
    console.log("connectFolk(): attempting to connect to " + address);
    this.folk = new FolkWS(false, null, address);
    this._folkReady = Promise.resolve(this.folk.connected || this.folk);
    return this.folk;
  };

  fn.watchFor = function (pattern) {
    const result = { id: null, values: null };
    const active = [];

    if (!this._folkReady) {
      console.warn(
        "You have not yet connected to a folk instance. Call connectFolk() first.",
      );
      return result;
    }

    this._folkReady.then(() => {
      this.folk.watch("/p/ " + pattern, {
        add: (match) => {
          active.push(match);
          result.id = active[0].p;
          console.log(match.p + " matches " + pattern);
          console.log(active);
        },
        remove: (match) => {
          const index = active.indexOf(match);
          active.splice(index, 1);
          result.id = active.length > 0 ? active[0].p : null;
          result.values = active.length > 0 ? active[0] : null;
          console.log(match.p + " has been removed");
          console.log(active);
        },
      });
    });

    return result;
  };

  fn.loadCSV = function (filename) {
    console.log("I will load the CSV file ${filename} soon!");
  };
}

p5.registerAddon(loadFolk);
