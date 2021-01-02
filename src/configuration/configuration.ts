import { readFileSync } from 'fs';
import * as path from 'path';

const configFileName: string = 'configuration.json';

export default (): any => {
    const configString: string = readFileSync(path.join(__dirname, configFileName), 'utf-8');
    return JSON.parse(configString);
}