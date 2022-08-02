
import * as fs from 'fs';
import path from 'path';
import * as yaml from 'js-yaml';
import { spawnSync } from 'child_process';

export default class Utils {

  // return a json of the yaml 
  static loadYaml(file: string)   {
    return yaml.load(fs.readFileSync(path.join(__dirname, file), { encoding: 'utf-8' }));
  }



  static shell(command: string, ...args: string[]) {
    const proc = spawnSync(command, args);

    if (proc.error) {
      throw new Error(proc.error.message);
    }

    if (proc.status !== 0) {
      throw new Error(`non-zero exist code ${proc.status}: ${proc.stdout} ${proc.stderr}`);
    }

    return proc.stdout;
  }


  static repoAdd(name:string, repoUrl: string) {

      Utils.shell('helm', 'repo', 'add', name, repoUrl );

  }

  static repoUpdate() {

      Utils.shell('helm', 'repo', 'update');

  }

}