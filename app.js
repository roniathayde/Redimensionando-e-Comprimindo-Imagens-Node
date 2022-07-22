const sharp = require('sharp'); // pacote para redimensionamento de imagem
const compress_images = require('compress-images'); // pacote para imprimir imagem
const fs = require('fs'); // pacote File System de Leitura de arquivos

let path = process.argv[2]; 
let width =Number(process.argv[3]);


function resize(inputPath,outputPath, width){

    sharp(inputPath).resize({width: width})
    .toFile(outputPath, (error)=>{
        if(error) {
            console.log(error)
        } else{
            console.log('Imagem redimensionada com sucesso');
            compress(outputPath, './compressed/');
        }
    })

}

function compress(pathInput, output){

   

compress_images(pathInput, output, { compress_force: false, statistic: true, autoupdate: true }, false,
                { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
                { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
                { svg: { engine: "svgo", command: "--multipass" } },
                { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
  function (error, completed, statistic) {
    console.log("-------------");
    console.log(error);
    console.log(completed);
    console.log(statistic);
    console.log("-------------");

    fs.unlink(pathInput, (error)=>{
        if(error){
            console.log(error)
        }else{
            console.log(pathInput + ' APAGADO')
        }
    })

  }
);

}

resize(path, './temp/output_resize.jpeg', width)