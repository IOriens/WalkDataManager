import DataGenerator from './DataGenerator'

const dataGenerator = new DataGenerator()
dataGenerator.generateData()
setInterval(dataGenerator.generateData.bind(dataGenerator), 10000)
