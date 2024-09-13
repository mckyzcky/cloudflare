import json

with open('tabData.json', 'r') as file:
    data = json.load(file)

tData = {}
for i in data:
    print(data[i], '\n\n')
    if input('Do you want to continue ? (y/n)') == 'y':
        dataArray = []
        c = 0
        dataDict = {}
        for j in data[i].split('\n'):
            if c % 2 == 0:
                s = 0
                x = ''
                for k in j:
                    if k == ' ':
                        s += 1
                    else:
                        if s != 0:
                            x += f'|{s}|'
                            s = 0
                        x += k
                if x != '':
                    if x[0] == '|':
                        x = x[1:]
                    if x[-1] == '|':
                        x = x[:-1]

                dataDict['chords'] = x
            else:
                dataDict['lyrics'] = j[0].upper() + j[1:].lower()
                dataArray.append(dataDict)
                dataDict = {}
            c += 1

        tData[i] = dataArray
    else:
        break
    print('\n\n')

with open('finalTabData.json', 'w') as file:
    json.dump(tData, file, indent=4)
