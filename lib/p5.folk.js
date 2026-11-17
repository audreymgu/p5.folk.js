const defaultAddress = "http://folk-hex.lan:4273/ws";

function loadFolk(p5, fn, lifecycles) {
  // helper function. warns user if folk has not been connected.
  function whenReady(sketch, callback) {
    if (!sketch._folkReady) {
      console.warn(
        "You have not yet connected to a folk instance. Call connectFolk() first.",
      );
      return;
    }
    sketch._folkReady.then(() => callback(sketch.folk));
  }

  // establish WS connection based on requested instance.
  // TODO: allow for simplified querying (i.e. "folk-audrey" rather than the full address)
  fn.connectFolk = function (address = defaultAddress) {
    console.log("connectFolk(): attempting to connect to " + address);
    this.folk = new FolkWS(false, null, address);
    this._folkReady = Promise.resolve(this.folk.connected || this.folk);
    return this.folk;
  };

  fn.isFolkReady = function () {
    return Boolean(this._folkReady);
  };

  // watch for claims matching the requested pattern and return the first result.
  // TODO: should this mirror the querySelector()/querySelectorAll() construction?
  fn.watchFor = function (pattern) {
    const result = { current: null };
    const active = [];

    whenReady(this, (folk) => {
      folk.watch(pattern, {
        add: (match) => {
          active.push(match);
          result.current = active[0];
          // console.log(match.p + " matches " + pattern);
                  },
        remove: (match) => {
          const index = active.indexOf(match);
          active.splice(index, 1);
          result.current = active.length > 0 ? active[0] : null;
          // console.log(match.p + " has been removed");
                  },
      });
    });
return result;
  };

  // request to know the distance between two folk programs.
  // submits a Wish which is handled by gestures.folk.
    fn.distanceFrom = function (p1, p2) {
    whenReady(this, (folk) => {
        console.log(p1);
        console.log(p2);
    });
    };

    return result;
  };
}

p5.registerAddon(loadFolk);
