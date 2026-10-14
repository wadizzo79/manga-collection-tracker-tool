const singlesVolumes = Array.from(
    { length: 37 },
    (_, index) => ({
        number: index + 1,
        covers: [index + 1]
    })
);

const blueLockSingles = Array.from(
    { length: 34 },
    (_, index) => ({
        number: index + 1,
        covers: [index + 1]
    })
);

const blueLockOmnibus = [
    { number: 1, covers: [1, 2, 3] },
    { number: 2, covers: [4, 5, 6] },
    { number: 3, covers: [7, 8, 9] },
    { number: 4, covers: [10, 11, 12] }
];
 
const gintamaSingles = Array.from(
    { length: 23 },
    (_, index) => ({
        number: index + 1,
        covers: [index + 1]
    })
);

export const mangaInfo = [{
    id: 30656,
    englishEditions: [
      {
        name: "Singles",
        format: "single",
        volumes: singlesVolumes
      },
      {
        name: "VIZBIG",
        format: "omnibus",
        volumes: [
            { number: 1, covers: [1, 2, 3] },
            { number: 2, covers: [4, 5, 6] },
            { number: 3, covers: [7, 8, 9] },
            { number: 4, covers: [10, 11, 12] },
            { number: 5, covers: [13, 14, 15] },
            { number: 6, covers: [16, 17, 18] },
            { number: 7, covers: [19, 20, 21] },
            { number: 8, covers: [22, 23, 24] },
            { number: 9, covers: [25, 26, 27] },
            { number: 10, covers: [28, 29, 30] },
            { number: 11, covers: [31, 32, 33] },
            { number: 12, covers: [34, 35, 36] }
        ]
      },
      {
        name: "Definitive Edition",
        format: "omnibus",
        volumes: [
            { number: 1, covers: [1, 2, 3] },
            { number: 2, covers: [4, 5, 6] },
            { number: 3, covers: [7, 8, 9] },
            { number: 4, covers: [10, 11, 12] },
            { number: 5, covers: [13, 14, 15] },
            { number: 6, covers: [16, 17, 18] }
        ]
      }
    ]
  },
  {
    id: 106130,
    englishEditions: [
      {
        name: "Singles",
        format: "single",
        volumes: blueLockSingles
      },
      {
        name: "Omnibus",
        format: "omnibus",
        volumes: blueLockOmnibus
      }
    ]
  },
  {
    id: 30044,
    englishEditions: [
      {
        name: "Singles",
        format: "single",
        volumes: gintamaSingles
      }
    ]

  }
];