export const getRC = () => {
    let randomColor = '#';
    const hexValues = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F']; 

    for(let i = 0; i < 6; i++){
      const index = Math.floor(Math.random() * hexValues.length)
      randomColor += hexValues[index];
    }

    return randomColor;
  };

export function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
};