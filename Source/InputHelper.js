class InputHelper
{
	constructor()
	{
		this.keyPressed = null;
		this.isMouseButtonPressed = false;
		this.mouseClickPos = new Coords();
	}

	initialize()
	{
		var d = document;

		d.body.onkeydown = this.handleEventKeyDown.bind(this);
		d.body.onkeyup = this.handleEventKeyUp.bind(this);
 
		var canvas = Globals.Instance.display.canvas;
		canvas.onmousedown = this.handleEventMouseDown.bind(this);
		canvas.onmouseup = this.handleEventMouseUp.bind(this);

		var canvasBounds = canvas.getBoundingClientRect();
		this.mouseClickPosOffset = new Coords
		(
			canvasBounds.left,
			canvasBounds.top,
			0
		);
	}

	// events

	handleEventKeyDown(event)
	{
		this.keyPressed = event.key;
		Globals.Instance.update();
	}

	handleEventKeyUp(event)
	{
		this.keyPressed = null;
	}

	handleEventMouseDown(event)
	{
		this.isMouseButtonPressed = true;
		this.mouseClickPos.overwriteWithXYZ
		(
			event.x, event.y, 0
		).subtract
		(
			this.mouseClickPosOffset
		);
		Globals.Instance.update();
	}

	handleEventMouseUp(event)
	{
		this.isMouseButtonPressed = false;
	}
}
