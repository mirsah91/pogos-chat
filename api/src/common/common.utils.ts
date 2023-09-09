import { plainToInstance } from 'class-transformer';
import { Type } from '@nestjs/common';

// For imitating async actions
export const wait = (time = 2000) => {
    return new Promise((resolve) => {
        setTimeout(resolve, time)
    })
}

export const mapToClass = <T, U = unknown>(object: U, toType: Type<T>): T => {
    return plainToInstance(toType, object);
}
