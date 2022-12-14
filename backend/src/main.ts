import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
async function bootstrap() {
    const PORT = process.env.PORT || 8080
    const app = await NestFactory.create(AppModule)

    app.enableCors({
        origin: 'http://localhost:3000',
        credentials: true,
    })

    const config = new DocumentBuilder()
        .setTitle('Oggetto')
        .setDescription('API Oggetto quiz')
        .setVersion('1.1.2')
        .addTag('Dartar')
        .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/api/docs', app, document)

    //app.useGlobalPipes(new ValidationPipe())

    await app.listen(PORT, () => console.log(`server started on ${process.env.PORT}`))
}
bootstrap()
