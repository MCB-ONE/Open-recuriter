function generateRandom(min = 0, max = 8) {
  // find diff
  const difference = max - min;

  // generate random number
  let rand = Math.random();

  // multiply with difference
  rand = Math.floor(rand * difference);

  // add with min value
  rand += min;

  return rand;
}

module.export = () => {
  const data = {
    candidatoWithTecnologias: [],
  };
    // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= 10; i++) {
    data.candidatoWithTecnologias.push({
      id: i,
      candidatoId: i,
      tecnologiaId: generateRandom(),
    });
  }
  console.log(data);
  return data;
};

// {"id": 0, "tagID": 0, "itemID": 1},
// {"id": 1, "tagID": 1, "itemID": 0},
// {"id": 2, "tagID": 1, "itemID": 1}
