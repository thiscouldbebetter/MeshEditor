
class Cursor
{
	constructor()
	{
		this.radius = 5;
		this.pos = new Coords(0, 0, 0);
	}

	drawToDisplayForCamera(display, camera)
	{
		var drawPos = display.drawPos;
		camera.transformCoordsWorldToView
		(
			drawPos.overwriteWith
			(
				this.pos
			)
		);
		display.drawCircle(drawPos, this.radius, null, "Black");
	}
}
 