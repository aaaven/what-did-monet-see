let model, img, ouputCanvas, count = 0;

main();

async function main() {
    tf.disableDeprecationWarnings();
    // load model
    const MODEL_URL = './models/tensorflowjs_model.pb';
    const WEIGHTS_URL = './models/weights_manifest.json';
    model = await tf.loadFrozenModel(MODEL_URL, WEIGHTS_URL);

    img = document.getElementById('img');
    outputCanvas = document.getElementById('outputCanvas');

    predict();
}

function predict() {
    // int32, [0, 255], [256, 256, 3]
    let input_tensor = tf.fromPixels(img);
    // preprocess: int32, [0, 255], [256, 256, 3]    =>    float, [-1, 1], [1, 256, 256, 3]
    let preprocessed_tensor = input_tensor.toFloat().div(tf.scalar(127.5)).sub(tf.scalar(1.0)).expandDims();
    // predict: [-1, 1] => [-1, 1]
    let output_tensor = model.predict(preprocessed_tensor);
    // postprocess: float, [-1, 1], [1, 256, 256, 3]   =>   float, [0, 1], [256, 256, 3]
    let postprocessed_tensor = output_tensor.mul(tf.scalar(0.5)).add(tf.scalar(0.5)).squeeze();
    // output image to canvas
    tf.toPixels(postprocessed_tensor, outputCanvas);
}

function loadInput() {
    let str;
    count++;
    if (count < 10) {
        str = "0000" + count;
    } else if (count < 100) { 
        str = "000" + count; 
    }else if(count < 1000){
        str = "00" + count;
    }
    if(count >= 1000) count = 0;
    
    img.src = "img/" + str + ".jpg";
}



// let model;
// let inputCanvas,outputCanvas; 

// function preload(){
//     tf.disableDeprecationWarnings();
//     const MODEL_URL = './models/tensorflowjs_model.pb';
//     const WEIGHTS_URL = './models/weights_manifest.json';
//     model = tf.loadFrozenModel(MODEL_URL, WEIGHTS_URL);
//     console.log(model);
//     ouputCanvas = document.getElementById('outputCanvas');
//     inputCanvas = document.getElementById('inputCanvas');
// }

// function setup(){

// }

// function draw(){

// }

// function keyPressed(){
//     const img = loadImage('img/00001.jpg');
//     inputCanvas.src = img;
//     predict(inputCanvas,outputCanvas);
// }


// function predict(img,ouputCanvas){
//     // int32, [0, 255], [256, 256, 3]
//     let input_tensor = tf.fromPixels(img); 
//     // preprocess: int32, [0, 255], [256, 256, 3]    =>    float, [-1, 1], [1, 256, 256, 3]
//     let preprocessed_tensor = input_tensor.toFloat().div(tf.scalar(127.5)).sub(tf.scalar(1.0)).expandDims();
//     // predict: [-1, 1] => [-1, 1]
//     let output_tensor = model.predict(preprocessed_tensor);
//     // postprocess: float, [-1, 1], [1, 256, 256, 3]   =>   float, [0, 1], [256, 256, 3]
//     let postprocessed_tensor = output_tensor.mul(tf.scalar(0.5)).add(tf.scalar(0.5)).squeeze();
//     // output image to canvas
//     tf.toPixels(postprocessed_tensor, outputCanvas);
// }