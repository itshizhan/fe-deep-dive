export function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

export function matchesExclude(patterns = ['node_modules'], filename) {
  return patterns.some(pattern => filename.includes(pattern));
}

const scopeHandlers = {
  FunctionDeclaration: path => `${path.node.id.name}()`,
  VariableDeclarator: path => path.node.id.name,
  ObjectProperty: path => path.node.key.name,
  ObjectMethod: path => `${path.node.key.name}()`,
  ClassMethod: path => `${path.node.key.name}()`,
  ClassExpression: path => path.node.id.name,
  ClassDeclaration: path => path.node.id.name,
  AssignmentExpression: path => path.node.left.name
};

export function computeContext(path, scope = []) {
  const parentPath = path.findParent(path =>
    Object.keys(scopeHandlers).includes(path.type)
  );
  if (parentPath) {
    return computeContext(parentPath, [
      scopeHandlers[parentPath.type](parentPath),
      ...scope
    ]);
  }
  return scope.length ? `${scope.join(' -> ')}` : '';
}
