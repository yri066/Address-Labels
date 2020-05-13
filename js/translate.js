//Транслитерация по правилам Яндекса (п. 3.1)
//Использование: 
//StreetNameTransliterate(streetName)


function transcribeWord(str) {

    var lstr = str.toLowerCase();

    var ru = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
        'е': 'e', 'ё': 'yo', 'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y',
        'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
        'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
        'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh',
        'щ': 'shch', 'ы': 'y', 'э': 'e', 'ю': 'yu', 'я': 'ya'
    };
    var newstr = [];

    for (var i = 0; i < str.length; i++) {

        var char = lstr.charAt(i);

        if (char == 'ъ' && i + 1 < lstr.length && lstr.charAt(i + 1) == 'е') {
            newstr.push('ye');
            i++;
            continue;
        }
        else if (char == 'ы' && i + 1 < lstr.length && lstr.charAt(i + 1) == 'й') {
            newstr.push('iy');
            i++;
            continue;
        }
        else if (char == 'и' && i + 1 < lstr.length && lstr.charAt(i + 1) == 'й') {
            newstr.push('iy');
            i++;
            continue;
        }
        else if (char == 'ь') {
            continue;
        }

        if (ru[char] == null) {
            newstr.push(char);
            continue;
        }


        if (str.charAt(i) == str.charAt(i).toUpperCase()) {
            var up = ru[char];
            up = up.charAt(0).toUpperCase() + up.substring(1);
            newstr.push(up);
        }
        else
            newstr.push(ru[char]);
    }

    return newstr.join('');
}

function hasNumber(str) {
    var rexp = /\d+/g;
    var matches = str.match(rexp);
    if (matches != null)
        return true;
    else return false;
}

function getNumber(str) {
    return parseFloat(str);
}

function hasOnlyNumber(str) {
    if (/^\d+$/.test(str))
        return true;
    else return false;
}



function StreetNameTransliterate(street) {
    var engStreetName = "";

    var parts = street.split(' ');
    parts.forEach(part => {

        // var isTypePart = false;
        // var typeName = "";

        // switch(part.toLowerCase())
        // {
        //     case "улица": typeName = "Street"; isTypePart = true; break;
        //     // case "проспект": typeName = "prospect"; isTypePart = true; break;
        //     // case "бульвар": typeName = "boulevard"; isTypePart = true; break;
        //     // case "аллея": typeName = "alley"; isTypePart = true; break;
        //     // case "парк": typeName = "park"; isTypePart = true; break;
        //     // case "площадь": typeName = "square"; isTypePart = true; break;
        //     // case "переулок": typeName = "lane"; isTypePart = true; break;
        //     // case "проезд": typeName = "passage"; isTypePart = true; break;
        // }


        if (hasNumber(part) && hasOnlyNumber(part)) {
            engStreetName += part + " ";
        }
        else if (hasNumber(part)) {
            var number = getNumber(part);

            switch(number)
            {
                case 1: engStreetName += number.toString() + "st "; break;
                case 2: engStreetName += number.toString() + "nd "; break;
                case 3: engStreetName += number.toString() + "rd "; break;
                default: engStreetName += number.toString() + "th "; break;
            }

        }
        else {
            engStreetName += transcribeWord(part) + " ";
        }
    });


    return engStreetName.trim();
}