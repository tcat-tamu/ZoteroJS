/**
 * A thin wrapper around the {@link ZoteroGroupDTO} object returned by the Zotero API
 */
class ZoteroGroup {
  /**
   * @param {ZoteroGroupDTO} dto
   */
  constructor(dto) {
    /** @type {string} */
    this.id = dto.id;

    /** @type {integer} */
    this.version = dto.version;

    /** @type {integer} */
    this.numItems = dto.meta.numItems;

    /** @type {date} */
    this.created = new Date(dto.meta.created);

    /** @type {date} */
    this.modified = new Date(dto.meta.lastModified);

    /** @type {string} */
    this.name = dto.data.name;

    /** @type {string} */
    this.description = dto.data.description;

    /** @type {string} */
    this.url = dto.data.url;

    /** @type {string} */
    this.ownerId = dto.data.owner;
  }
}

export { ZoteroGroup };
