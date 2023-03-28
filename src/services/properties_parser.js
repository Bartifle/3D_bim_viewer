function HEXtoSpecial(element) {
  // https://www.thoughtco.com/html-codes-french-characters-4062211
  const specCarac = {
    à: /\\X\\E0/g,
    â: /\\X\\E2/g,
    æ: /\\X\\E6/g,
    ç: /\\X\\E7/g,
    è: /\\X\\E8/g,
    é: /\\X\\E9/g,
    ê: /\\X\\EA/g,
    ë: /\\X\\EB/g,
    î: /\\X\\EE/g,
    ï: /\\X\\EF/g,
    ô: /\\X\\F4/g,
    œ: /\\X\\153/g,
    ù: /\\X\\F9/g,
    û: /\\X\\FB/g,
    ü: /\\X\\FC/g,
  };
  Object.entries(specCarac).forEach(([k, v]) => {
    if (typeof element == "string") {
      element = element.replace(v, k);
    }
  });
  return element;
}

export function propertiesParser(properties) {
  let htmlProperties = document.getElementById("properties");
  let detailsDiv = document.createElement("div");

  let detailsElement;
  let summaryElement;

  properties.forEach((property) => {
    if (property.name.substr(0, 5) != "Pset_") {
      let propsUlElement = document.createElement("ul");
      let propsDetailsElement;
      let propsSummaryElement;

      property.properties.forEach((element) => {
        propsDetailsElement = document.createElement("details");
        propsSummaryElement = document.createElement("summary");

        propsSummaryElement.innerHTML = HEXtoSpecial(element.name);
        propsDetailsElement.innerHTML = `
          <ul>
          <b>Type :</b> ${HEXtoSpecial(element.type)}<br>
          <b>Valeur :</b> ${HEXtoSpecial(element.value)}<br>
          <b>Valeur Type :</b> ${HEXtoSpecial(element.valueType)}
          </ul>
        `;

        propsUlElement.appendChild(propsDetailsElement);
        propsDetailsElement.appendChild(propsSummaryElement);
      });
      detailsElement = document.createElement("details");

      summaryElement = document.createElement("summary");
      summaryElement.innerHTML = HEXtoSpecial(property.name);

      detailsElement.appendChild(summaryElement);
      detailsElement.appendChild(propsUlElement);

      detailsDiv.appendChild(detailsElement);
    }
  });
  console.log(detailsDiv);
  htmlProperties.replaceChild(detailsDiv, htmlProperties.childNodes[0]);
  // htmlProperties.innerHTML = `${detailsDiv}`
}
