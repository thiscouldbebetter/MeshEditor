
class Scene
{
	constructor(camera, mesh)
	{
		this.camera = camera;
		this.mesh = mesh;

		this.selection = new Selection();
		this.cursor = new Cursor();

		this.highlightVertices = true;
		this.highlightFaces = true;
	}

	drawToDisplay(display)
	{
		this.mesh.drawToDisplayForScene(display, this);
		this.selection.drawToDisplayForCameraAndMesh
		(
			display, this.camera, this.mesh
		);
		this.cursor.drawToDisplayForCamera(display, this.camera);
	}

	update()
	{
		this.update_Input();
		this.camera.constraintsApply();
		this.drawToDisplay(Globals.Instance.display);
	}

	update_Input()
	{
		var session = Globals.Instance.session;
		var inputHelper = Globals.Instance.inputHelper;
		var keyPressed = inputHelper.keyPressed;
		if (keyPressed != null)
		{
			inputHelper.keyPressed = null;

			var amountToMove = .1;

			if (keyPressed.startsWith("Arrow") )
			{
				if (keyPressed == "ArrowDown")
				{
					session.viewMoveDown(amountToMove);
				}
				else if (keyPressed == "ArrowLeft")
				{
					session.viewMoveLeft(amountToMove);
				}
				else if (keyPressed == "ArrowRight")
				{
					session.viewMoveRight(amountToMove);
				}
				else if (keyPressed == "ArrowUp")
				{
					session.viewMoveUp(amountToMove);
				}
			}
			else if (keyPressed == "=" || keyPressed == "+") 
			{
				session.viewMoveIn(amountToMove);
			}
			else if (keyPressed == "-")
			{
				session.viewMoveOut(amountToMove);
			}
 
		}

		if (inputHelper.isMouseButtonPressed)
		{
			inputHelper.isMouseButtonPressed = false;
			var cursorPosApparent =
				this.camera.transformCoordsWorldToView
				(
					this.cursor.pos.clone()
				);
			var cursorPosNext = inputHelper.mouseClickPos.clone();
			cursorPosNext.z = cursorPosApparent.z;
			this.camera.transformCoordsViewToWorld(cursorPosNext);
			this.cursor.pos.overwriteWith(cursorPosNext);
		}
	}
}
