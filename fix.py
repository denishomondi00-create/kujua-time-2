import sys
content = sys.stdin.read()
target = 'async findById(id) {'
replacement = 'async findById(id) { if (!id || id === "undefined") throw new common_1.NotFoundException("Event type not found.");'
print(content.replace(target, replacement))
