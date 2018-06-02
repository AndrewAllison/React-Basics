const user = {
  name: 'Andrew',
  cities: ['Newcastle', 'London', 'Arecifie'],
  printPlacesLived() {
    this.cities.forEach((city) => {
      console.log(this.name + ' has lived in ' + city)
    });
  }
}

user.printPlacesLived();

const multiplier = {
  multiply: (array, multiplyBy) => {
    return array.map((value) => value * multiplyBy);
  }
};
console.log(multiplier.multiply([1, 2, 3], 2));