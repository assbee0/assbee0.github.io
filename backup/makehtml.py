f = open("biology.html", "r", encoding="utf-8")
lines = f.readlines()

names = []

for line in lines:
    if line.startswith("<div"):
        name = line[line.find(">") + 1 : line.find("<b")]
        names.append(name)

f.close()

lineIndex = 0
namesIndex = len(names) - 1
for line in lines:
    if line.startswith("  <area"):
        symbol = line.rfind("\"") + 1
        lines[lineIndex] = line[:symbol] + " onmousedown=\"redirectToPage('Animalia/" + names[namesIndex] + ".html')\"" + line[symbol:]
        namesIndex -= 1
    lineIndex += 1

fw = open("index.html", "w", encoding="utf-8")
fw.writelines(lines)
fw.close()
