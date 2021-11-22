
var scene = new THREE.Scene();

function cubo(x, y, z, color, material, alambrado){
    var cubeGeometry = new THREE.BoxGeometry(x, y, z);
    var cubeMaterial;
    switch(material){
     case 'Basic': cubeMaterial = new THREE.MeshBasicMaterial({color: color, wireframe: alambrado});
      break;

     case 'Standard': cubeMaterial = new THREE.MeshStandardMaterial({color: color, wireframe: alambrado});
      break;

     case 'Physical': cubeMaterial = new THREE.MeshPhysicalMaterial({color: color, wireframe: alambrado});
      break;

     case 'Phong': cubeMaterial = new THREE.MeshPhongMaterial({color: color, wireframe: alambrado});
      break;

     case 'Lambert': cubeMaterial = new THREE.MeshLambertMaterial({color: color, wireframe: alambrado});
      break;
    }
    
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial)

    
    scene.add(cube);
    return(cube);
}
function init() {
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(window.innerWidth, window.innerHeight);

  
    var axes = new THREE.AxesHelper(20);
    scene.add(axes);

    

   light = new THREE.PointLight(0xFFFF00); 
    light.position.set( -10, 10, 10 );            
    scene.add( light ); 


    Cubo = [];   
    var dim = prompt("Ingrese valor de la dimension del cubo ","Valor"); 
    if(dim != null){
	alert("Has escrito " + dim); 
    } else {
	alert("No has escrito nada");
    }

    delta= dim/2;
    diagonal= Math.sqrt(Math.pow(delta, 2)+ Math.pow(delta, 2));
    
    var Angulo = prompt("Ingrese valor del angulo a rotar del cubo EN GRADOS","Valor"); 
    if(Angulo != null){
	alert("Has escrito " + Angulo); 
    } else {
	alert("No has escrito nada"); 
    }
    ang_rad= (Angulo)*((2*Math.PI)/(360)); 
    Angulo_2= ((Math.PI)/4)-ang_rad;
    valor=(Math.cos(Angulo_2))*diagonal;

    Cubo.push(cubo(dim, dim, dim, 'red', 'Physical', false)); 

    Cubo.push(cubo(dim, dim, dim, 'green', 'Physical', false)); 
    Cubo.push(cubo(dim, dim, dim, 'yellow', 'Physical', false));

    for(i=0; i<3; i++){ 

      Cubo[i].translateX(valor); 
      Cubo[i].translateZ(valor); 
      Cubo[i].translateY(delta); 
    }
    
    for(i=1; i<3; i++){ 

        escala= 1/(2*i); //Escalado a la mitad del cubo anterior.
        unidades=dim/2+dim/4+((((dim/2)+(dim/4))/2))*(i-1); 
        Cubo[i].scale.set(escala, escala, escala); 
        Cubo[i].translateY(unidades); 

    }

    Cubo[0].rotateY(ang_rad);
    Cubo[2].rotateY(ang_rad);


   
    camera.position.set(-3*dim, 4*dim, 3*dim);
    camera.lookAt(scene.position);

    
    document.getElementById("webgl-output").appendChild(renderer.domElement);

    
    renderer.render(scene, camera);
}