
class Display
{
	constructor(viewSize)
	{
		this.viewSize = viewSize;
		 
		this.colorFore = "LightGray";
		this.colorBack = "White";
		 
		// helper variables
		this.drawPos = new Coords();
	}

	clear()
	{
		this.drawRectangle
		(
			Coords.Instances().Zeroes,
			this.viewSize,
			this.colorBack,
			this.colorFore
		);
	}

	drawCircle(center, radius, colorFill, colorBorder)
	{
		if (radius < 0)
		{
			return;
		}

		this.graphics.beginPath();

		this.graphics.arc
		(
			center.x, center.y,
			radius,
			0, Math.PI * 2 // start and stop angles
		);

		if (colorFill != null)
		{
			this.graphics.fillStyle = colorFill;
			this.graphics.fill();
		}

		if (colorBorder != null)
		{
			this.graphics.strokeStyle = colorBorder;
			this.graphics.stroke();
		}
	}

	drawLine(fromPos, toPos)
	{
		this.graphics.beginPath();
		this.graphics.moveTo(fromPos.x, fromPos.y);
		this.graphics.lineTo(toPos.x, toPos.y);
		this.graphics.stroke();
	}

	drawRectangle(pos, size, colorFill, colorBorder)
	{
		if (colorFill != null)
		{
			this.graphics.fillStyle = colorFill;
			this.graphics.fillRect
			(
				pos.x, pos.y,
				size.x, size.y
			);
		}
		 
		if (colorBorder != null)
		{
			this.graphics.strokeStyle = colorBorder;
			this.graphics.strokeRect
			(
				pos.x, pos.y,
				size.x, size.y
			);
		}
	}

	initialize()
	{
		var d = document;

		this.canvas = d.createElement("canvas");
		this.canvas.width = this.viewSize.x;
		this.canvas.height = this.viewSize.y;
		 
		this.graphics = this.canvas.getContext("2d");

		var divDisplay = d.getElementById("divDisplay");
		divDisplay.innerHTML = null;
		divDisplay.appendChild(this.canvas);
	}
}
