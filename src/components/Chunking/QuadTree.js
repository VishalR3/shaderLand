import { Box2, Vector2 } from "three";

const MIN_NODE_SIZE = 1;

const QuadTree = (params) => {
  const b = new Box2(params.min, params.max);
  const root = {
    bounds: b,
    children: [],
    center: b.getCenter(new Vector2()),
    size: b.getSize(new Vector2()),
  };
  return root;
};

export const InsertChildren = (child, pos) => {
  const distanceToChildren = child.center.distanceTo(pos);

  if (distanceToChildren < child.size.x && child.size.x > MIN_NODE_SIZE) {
    child.children = createChildren(child);
    for (let c of child.children) {
      InsertChildren(c, pos);
    }
  }
};

export const createChildren = (child) => {
  const midpoint = child.bounds.getCenter(new Vector2());

  // Bottom left
  const b1 = new Box2(child.bounds.min, midpoint);

  // Bottom right
  const b2 = new Box2(
    new Vector2(midpoint.x, child.bounds.min.y),
    new Vector2(child.bounds.max.x, midpoint.y)
  );

  // Top left
  const b3 = new Box2(
    new Vector2(child.bounds.min.x, midpoint.y),
    new Vector2(midpoint.x, child.bounds.max.y)
  );

  // Top right
  const b4 = new Box2(midpoint, child.bounds.max);

  const children = [b1, b2, b3, b4].map((b) => {
    return {
      bounds: b,
      children: [],
      center: b.getCenter(new Vector2()),
      size: b.getSize(new Vector2()),
    };
  });

  return children;
};

export default QuadTree;
