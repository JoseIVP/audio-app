import json
diccionario={}
lista=[]
first_line=True
with open("tabla A440.csv") as file:
    for line in file:
        if first_line:
            first_line=False
            continue
        nota, frecuencia, _ =line.split(";")
        if '#' in nota:
            nota=nota[1:4]
        diccionario[frecuencia]=nota
        lista.append(float(frecuencia))
print(diccionario)
print(lista)
with open("keymap.json", "w") as outfile:
    json.dump(diccionario,"keymap.json")

