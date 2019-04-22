import { setupT3d } from './BRFv4Drawing3DUtils_ThreeJS'
import { setupDrawing } from './BRFv4DrawingUtils_CreateJS'

function init(brfv4, virtualMirror) {
	"use strict";
	// Tell the DrawingUtils where to draw to.
	
	

	var t3d = virtualMirror.drawing3d.t3d;
	var numFacesToTrack = 1;

	setupDrawing(virtualMirror);
	setupT3d(virtualMirror);

	function loadModels(arModel) {

		if(t3d) {

			// Remove all models and load new ones.
			

			t3d.removeAll();
			t3d.loadOcclusionHead(`assets/models/brfv4_occlusion_head.json`, numFacesToTrack);
			t3d.loadModel(`assets/models/${arModel}`, numFacesToTrack);
		}
	}

	virtualMirror.initCurrentExample = function(brfManager, resolution, arModel) {

		
		brfManager.init(resolution, resolution, virtualMirror.appId);
		brfManager.setNumFacesToTrack(numFacesToTrack);

		// Relax starting conditions to eventually find more faces.

		var maxFaceSize = resolution.height;

		if(resolution.width < resolution.height) {
			maxFaceSize = resolution.width;
		}

		brfManager.setFaceDetectionParams(		maxFaceSize * 0.20, maxFaceSize * 1.00, 12, 8);
		brfManager.setFaceTrackingStartParams(	maxFaceSize * 0.20, maxFaceSize * 1.00, 32, 35, 32);
		brfManager.setFaceTrackingResetParams(	maxFaceSize * 0.15, maxFaceSize * 1.00, 40, 55, 32);

		loadModels(arModel);
	};

	virtualMirror.updateCurrentExample = function(brfManager, imageData, draw, resolution) {
		let webcam = document.getElementById("_webcam");

		let imageDataCtx = document.getElementById('_imageData').getContext('2d');
		imageDataCtx.setTransform(-1.0, 0, 0, 1, resolution.width, 0); // A virtual mirror should be... mirrored
    	imageDataCtx.drawImage(webcam, 0, 0, resolution.width, resolution.height);
		// imageDataCtx.setTransform( 1.0, 0, 0, 1, 0, 0); // unmirrored for drawing the results
	
		brfManager.update(imageDataCtx.getImageData(0, 0, resolution.width, resolution.height).data);

		if(t3d) t3d.hideAll(); // Hide 3d models. Only show them on top of tracked faces.

		draw.clear();

		var faces = brfManager.getFaces();

		for(var i = 0; i < faces.length; i++) {

			var face = faces[i];

			if(face.state === brfv4.BRFState.FACE_TRACKING_START || face.state === brfv4.BRFState.FACE_TRACKING || face.state === brfv4.BRFState.FACE_DETECTION) {

				// Draw the 68 facial feature points as reference.

				draw.drawVertices(face.vertices, 2.0, false, 0x00a0ff, 0.4);

				// Set the 3D model according to the tracked results.

				if(t3d) {
					t3d.update(i, face, true);
				} 
			}
		}

		if(t3d) { 
			t3d.render(); 
		}

		setTimeout(function() {
			virtualMirror.updateCurrentExample(	// depends on the chosen example
				brfManager, imageData, draw, resolution
			);
		}, 100);
	};

};

export function initThreeJS(brfv4, virtualMirror, brfManager, resolution, imageData, arModel) {
	
	init(brfv4, virtualMirror);
	virtualMirror.initCurrentExample(brfManager, resolution, arModel);
	virtualMirror.updateCurrentExample(brfManager, imageData, virtualMirror.drawing, resolution)
}