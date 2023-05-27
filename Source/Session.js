
class Session
{
	constructor(scene)
	{
		this.scene = scene;
	}

	initialize()
	{
		// todo
	}

	update()
	{
		var display = Globals.Instance.display;
		display.clear();
		this.scene.update();

		this.updateControls();
	}

	updateControls()
	{
		this.updateControls_Camera();
		this.updateControls_Cursor();
	}

	updateControls_Camera()
	{
		var cameraPos = this.scene.camera.loc.pos;

		var d = document;

		var inputCameraPosX =
			d.getElementById("inputCameraPosX");
		var inputCameraPosY =
			d.getElementById("inputCameraPosY");
		var inputCameraPosZ =
			d.getElementById("inputCameraPosZ");

		inputCameraPosX.value = cameraPos.x;
		inputCameraPosY.value = cameraPos.y;
		inputCameraPosZ.value = cameraPos.z;
	}

	updateControls_Cursor()
	{
		var cursorPos = this.scene.cursor.pos;

		var d = document;

		var inputCursorPosX =
			d.getElementById("inputCursorPosX");
		var inputCursorPosY =
			d.getElementById("inputCursorPosY");
		var inputCursorPosZ =
			d.getElementById("inputCursorPosZ");

		inputCursorPosX.value = cursorPos.x;
		inputCursorPosY.value = cursorPos.y;
		inputCursorPosZ.value = cursorPos.z;
	}

	// tools

	deselectAtCursor()
	{
		this.selectOrDeselectAtCursor(true);
	}

	sceneLoadFromFile(fileToLoad)
	{
		var fileHelper = new FileHelper();
		fileHelper.loadFileAsText
		(
			fileToLoad,
			this.sceneLoadFromFile_2, // callback
			this // contextForCallback
		);
	}

	sceneLoadFromFile_2(fileAsText)
	{
		var sceneSerialized = fileAsText;
		var serializer = this.serializerBuild();
		var sceneDeserialized = serializer.deserialize(sceneSerialized);

		// hack - Serializer currently breaks referential integrity.
		sceneDeserialized.camera.reinitialize();

		this.scene = sceneDeserialized;
		this.update();
	}

	sceneSaveToFile()
	{
		var serializer = this.serializerBuild();
		var sceneSerialized = serializer.serialize(this.scene);
		var fileHelper = new FileHelper();
		fileHelper.saveTextStringToFileWithName(sceneSerialized, "Scene.json");
	}

	selectAll()
	{
		var vertexIndicesSelected = this.scene.selection.vertexIndices;
		vertexIndicesSelected.length = 0;

		var numberOfVertices = this.scene.mesh.vertices.length;

		for (var i = 0; i < numberOfVertices; i++)
		{
			vertexIndicesSelected.push(i);
		}
		this.update();
	}

	selectAtCursor()
	{
		this.selectOrDeselectAtCursor(false);
	}

	selectOrDeselectAtCursor(deselectRatherThanSelect)
	{
		var inputHelper = Globals.Instance.inputHelper;
		var camera = this.scene.camera;
		var mesh = this.scene.mesh;
		var selection = this.scene.selection;
		var vertices =
		(
			deselectRatherThanSelect
			? selection.verticesForMesh(mesh)
			: mesh.vertices
		);
		 
		var vertexPosApparent = new Coords();
		var displacement = vertexPosApparent;
		var vertexHandleRadius = 5;

		var vertexZClosestSoFar = Number.POSITIVE_INFINITY;
		var vertexIndexClosestSoFar = null;
 
		for (var i = 0; i < vertices.length; i++)
		{
			var vertex = vertices[i];
			displacement = camera.transformCoordsWorldToView
			(
				vertexPosApparent.overwriteWith
				(
					vertex
				)
			).subtract
			(
				inputHelper.mouseClickPos
			);

			var vertexZ = displacement.z;
			displacement.z = 0;

			var distanceOfVertexFromClick = displacement.magnitude();

			if (distanceOfVertexFromClick <= vertexHandleRadius)
			{
				if (vertexZ < vertexZClosestSoFar)
				{
					vertexZClosestSoFar = vertexZ;
					vertexIndexClosestSoFar = i;
				}
			}

		} // end for each vertex

		if (vertexIndexClosestSoFar != null)
		{
			if (deselectRatherThanSelect == true)
			{
				selection.vertexIndices.remove(vertexIndexClosestSoFar);
			}
			else
			{
				if (selection.vertexIndices.contains(vertexIndexClosestSoFar) == false)
				{
					selection.vertexIndices.push(vertexIndexClosestSoFar);
				}
			}
		}
		this.update();
	}

	selectNone()
	{
		var vertexIndicesSelected =
			this.scene.selection.vertexIndices;
		vertexIndicesSelected.length = 0;
		this.update();
	}

	transformWithCenterApplyToSelected(transform, center)
	{
		// todo - Use center.
	 
		var scene = this.scene;
		var selection = scene.selection;
		var selectionVertices = selection.verticesForMesh(scene.mesh);
		for (var i = 0; i < selectionVertices.length; i++)
		{
			var vertex = selectionVertices[i];
			transform.transformCoords(vertex);
		}
	}

	viewMove(direction, distanceToMove)
	{
		var camera = this.scene.camera;
		var cameraPos = camera.loc.pos;
		var offset = direction.clone().multiplyScalar(distanceToMove);
		cameraPos.add(offset);
	}

	viewMoveDown(distanceToMove)
	{
		this.viewMove
		(
			this.scene.camera.loc.orientation.down, distanceToMove
		); 
	}

	viewMoveIn(distanceToMove) 
	{
		var camera = this.scene.camera;
		camera.constraints[2].distanceToMaintain -= distanceToMove; // hack
	}

	viewMoveLeft(distanceToMove) 
	{
		this.viewMove
		(
			this.scene.camera.loc.orientation.right.clone().invert(),
			distanceToMove
		); 
	}

	viewMoveOut(distanceToMove)
	{
		var camera = this.scene.camera;
		camera.constraints[2].distanceToMaintain +=
			distanceToMove; // hack
	}

	viewMoveRight(distanceToMove)
	{
		this.viewMove
		(
			this.scene.camera.loc.orientation.right,
			distanceToMove
		); 
	}

	viewMoveUp(distanceToMove)
	{
		this.viewMove
		(
			this.scene.camera.loc.orientation.down.clone().invert(),
			distanceToMove
		); 
	}

	viewSet(cameraOrientationNew)
	{
		var scene = this.scene;
		var camera = scene.camera;
		var cameraLoc = camera.loc;
		 
		var distanceOfCameraFromOrigin =
			cameraLoc.pos.magnitude();

		cameraLoc.pos.overwriteWith
		(
			cameraOrientationNew.forward
		).invert().multiplyScalar
		(
			distanceOfCameraFromOrigin
		);

		cameraLoc.orientation.overwriteWith(cameraOrientationNew);
	}

	viewSetFront()
	{
		this.viewSet
		(
			new Orientation
			(
				new Coords(0, 1, 0), // forward
				new Coords(1, 0, 0), // right
				new Coords(0, 0, 1) // down
			)
		);
	}

	viewSetSelected()
	{
		var scene = this.scene;
		var camera = scene.camera;
		var mesh = scene.mesh;

		var selection = scene.selection;
		var selectionMedian = selection.medianForMesh(mesh);
		if (selectionMedian != null)
		{
			var constraintLookAt = this.scene.camera.constraints[1]; // hack
			constraintLookAt.targetPos.overwriteWith(selectionMedian);
		}
	}

	viewSetSide()
	{
		this.viewSet
		(
			new Orientation
			(
				new Coords(-1, 0, 0), // forward
				new Coords(0, 1, 0), // right
				new Coords(0, 0, 1) // down
			)
		);
	}

	viewSetTop()
	{
		this.viewSet
		(
			new Orientation
			(
				new Coords(0, 0, 1), // forward
				new Coords(1, 0, 0), // right
				new Coords(0, -1, 0) // down
			)
		);
	}

	// serializer
	 
	serializerBuild()
	{
		return new Serializer
		([
			Camera,
			Constraint_KeepDistance,
			Constraint_LookAt,
			Constraint_Upright,
			Coords,
			Cursor,
			Edge,
			Face,
			Location,
			Mesh,
			Orientation,
			Scene,
			Selection,
			Transform_Multiple,
			Transform_Orient,
			Transform_OrientInverse,
			Transform_Perspective,
			Transform_PerspectiveInverse,
			Transform_Rotate,
			Transform_Scale,
			Transform_Translate,
			Transform_TranslateInverse,
		]);
	}
}
