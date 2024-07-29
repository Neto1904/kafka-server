/* eslint-disable no-restricted-syntax */
import { pipeline } from 'stream/promises';
import shapefile from 'shapefile';
import path from 'path';

async function* myCustomReadable() {
  const shapefilePath = path.join(process.cwd(), 'territories', 'territories.shp');
  const dbfPath = path.join(process.cwd(), 'territories', 'territories.dbf');
  const shapefileObject = await shapefile.open(shapefilePath, dbfPath, { encoding: 'UTF-8' });

  while (true) {
    // eslint-disable-next-line no-await-in-loop
    const { done, value } = await shapefileObject.read();
    if (done) break;
    yield value;
  }
}

async function* myCustomTransform(stream) {
  for await (const chunk of stream) {
    yield {
      id: chunk.properties.ID,
      name: chunk.properties.NAME,
      grouping: chunk.properties.GROUPING,
      geometry: chunk.geometry,
    };
  }
}

async function myCustomWritable(stream) {
  const array = [];
  let total = 0;
  for await (const chunk of stream) {
    console.log(chunk);
    if (array.length < 100) array.push(chunk);
    total += 1;
  }
  console.log('in the end total is ', total);
}
try {
  await pipeline(
    myCustomReadable,
    myCustomTransform,
    myCustomWritable,
  );
  console.log('process has finished!');
} catch (error) {
  console.error('\nabort', error.message);
}
