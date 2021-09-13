
class Transform_Multiple
{
	constructor(children)
	{
		this.children = children;
	}

	transformCoords(coordsToTransform)
	{
		for (var i = 0; i < this.children.length; i++)
		{
			var child = this.children[i];
			child.transformCoords(coordsToTransform);
		}
		 
		return coordsToTransform;
	}
}
 