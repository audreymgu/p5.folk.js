const defaultAddress = "http://folk-hex.lan:4273/ws";

function loadFolk(p5, fn, lifecycles) {
  fn.connectFolk = async function (address = defaultAddress) {
    console.log("connectFolk(): attempting to connect to " + address);

    this.folk = new FolkWS(false, null, address);

    await this.folk.watchCollected(
      `/om/ is a dtObjectManager`,
      async (managers) => {
        if (managers.length == 0) {
          console.log("connectFolk(): No object manager");
          return;
        }
        console.log("connectFolk(): Object manager found");
      },
    );

    return this.folk;
  };

  fn.loadCSV = function (filename) {
    console.log(`I will load the CSV file ${filename} soon!`);
  };
}

p5.registerAddon(loadFolk);
