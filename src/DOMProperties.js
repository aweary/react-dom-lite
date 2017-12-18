import hyphenate from 'dom-helpers/util/hyphenate';

export const RESERVED_PROPS = {
  children: true,
  dangerouslySetInnerHTML: true,
  innerHTML: true
};

export const isEventRegex = /^on([A-Z][a-zA-Z]+)$/;

const STRING_BOOLEAN = 1;
const ATTRIBUTE = 2;

/**
 * A string attribute that accepts react boolean values. The rendered
 * value should be "true" or "false",
 * e.g `<input value="true" />` not `<input value />`
 */
const isStringBoolean = (key: string) =>
  key === 'contentEditable' ||
  key === 'draggable' ||
  key === 'spellCheck' ||
  key === 'value';

/**
 * Props that must be rendered as attributes even if accessable as a property.
 */
const isAttribute = key => key === 'list' || key === 'type'; // || isSvg || isNamespaced

export function setValueOnElement(domElement, propName, value) {
  if (RESERVED_PROPS.hasOwnProperty(propName)) return;

  if (!isAttribute(propName) && propName in domElement) {
    domElement[propName] = value == null ? '' : value;
    return;
  }

  const attributeName = hyphenate(propName);
  if (value == null) {
    domElement.removeAttribute(attributeName);
  } else {
    if ((value === true || value === false) && isStringBoolean(propName)) {
      value = String(value);
    } else if (value === true) {
      value = '';
    }

    domElement.setAttribute(attributeName, value);
  }
}
