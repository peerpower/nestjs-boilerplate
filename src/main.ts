import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { CamelcaseTransformerPipe } from '@utils/pipe/camelcase-transform.pipe';
import { useContainer } from 'class-validator';
import { AppModule } from './modules/main/app.module';
import { setupSwagger } from './swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    setupSwagger(app);
    app.enableCors();
    app.useGlobalPipes(new CamelcaseTransformerPipe(), new ValidationPipe());
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    await app.listen(3000);
}
bootstrap();
