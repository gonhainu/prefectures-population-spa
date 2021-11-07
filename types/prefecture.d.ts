export interface Prefecture {
  prefCode: number
  prefName: string
}

export interface PrefecturePopulation {
  prefCode: number
  populations: {
    year: number
    value: number
  }
}
