import { PipeTransform, Injectable } from '@nestjs/common';
import * as camelcaseKeys from 'camelcase-keys';

@Injectable()
export class CamelcaseTransformerPipe implements PipeTransform {
    transform(value: any) {
        return camelcaseKeys(value, { deep: true });
    }
}
