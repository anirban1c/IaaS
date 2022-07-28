
import * as fs from 'fs';
import path from 'path';
import * as yaml from 'js-yaml';


export default class Utils {

  static loadYaml(file: string) {
    return yaml.load(fs.readFileSync(path.join(__dirname, file), { encoding: 'utf-8' }));
  }

}