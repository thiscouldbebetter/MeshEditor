
class Orientation
{
	constructor(forward, right, down)
	{
		this.forward = forward;
		this.right = right;
		this.down = down;
		this.axesReset();
	}

	// static methods
 
	static fromForwardAndDown(forward, down)
	{
		var returnValue = new Orientation
		(
			forward.clone(), new Coords(), down.clone()
		);
		returnValue.orthogonalizeAxes().normalizeAxes();
		return returnValue;
	}

	axesReset()
	{
		this.axes = [this.forward, this.right, this.down];  
	}
	 
	// instance methods
	 
	normalizeAxes()
	{
		for (var i = 0; i < this.axes.length; i++)
		{
			this.axes[i].normalize();
		}
		 
		return this;
	}
	 
	orthogonalizeAxes()
	{
		this.right.overwriteWith(this.down).crossProduct(this.forward);
		this.down.overwriteWith(this.forward).crossProduct(this.right);
		return this;
	}
	 
	overwriteWith(other)
	{
		this.forward.overwriteWith(other.forward);
		this.right.overwriteWith(other.right);
		this.down.overwriteWith(other.down);
		return this;
	}
}
