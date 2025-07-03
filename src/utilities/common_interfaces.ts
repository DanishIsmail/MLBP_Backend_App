interface IMongodbConnOptions {
  useNewUrlParser?: boolean;
  useUnifiedTopology?: boolean;
  tlsCAFile?: string;
}

interface findOneAndUpdateOptions {
  upsert: boolean;
  new: boolean;
}

export { IMongodbConnOptions, findOneAndUpdateOptions };
