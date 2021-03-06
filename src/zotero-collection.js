// @flow

import { GetCollectionItemsCommand } from './commands/library/get-collection-items';

/*:: import { ZoteroLibrary } from './zotero-library';*/
/*:: import { ZoteroItem } from './zotero-item';*/

/**
 * Zotero allows users to organize items into a hierarchy of collections.
 */
class ZoteroCollection {
  /*:: library: ZoteroLibrary;*/
  /*:: id: string;*/
  /*:: version: number;*/
  /*:: name: string;*/
  /*:: parentId: string;*/

  /**
   * @param  {ZoteroLibrary} library
   * @param  {ZoteroCollectionDTO} dto
   */
  constructor(library/*: ZoteroLibrary*/, dto/*: Object*/) {
    /** @type {ZoteroLibrary} */
    this.library = library;

    /** @type {string} */
    this.id = dto.key;

    /** @type {integer} */
    this.version = dto.version;

    /** @type {string} */
    this.name = dto.data.name;

    /** @type {string} */
    this.parentId = dto.data.parentCollection;
  }

  /**
   * @return {boolean} True if this collection has a parent collection.
   */
  hasParent()/*: boolean*/ {
    return this.parentId ? true : false;
  }

  /**
   * @return {Promise.<ZoteroCollection>|null} Resolves to the parent collection or null if this collection has no parent.
   */
  getParent()/*: ?Promise<ZoteroCollection>*/ {
    return this.parentId ? this.library.getCollection(this.parentId) : null;
  }

  /**
   * @return {Promise.<ZoteroCollection[]>} Resolves to an array of this collection's child collections.
   */
  getChildren()/*: Promise<ZoteroCollection[]>*/ {
    return this.library.getSubCollections(this.id);
  }

  /**
   * Retrieves a list of all items belonging to only this collection. This method does not retrieve items recursively in sub-collections.
   * Use {@link ZoteroCollection#getAllItems} to retrieve items recursively instead.
   * @return {Promise.<ZoteroItem[]>} Resolves to a list of all items contained within this collection.
   */
  getItems()/*: Promise<ZoteroItem[]>*/ {
    let command = new GetCollectionItemsCommand(this);
    return command.execute();
  }

  /**
   * Retrieves a list of all items belonging to this collection and all items in all sub-collections.
   * @return {Promise.<ZoteroItem[]>} Resolves to a list of all items contained within this collection and all sub-collections.
   */
  getAllItems()/*: Promise<ZoteroItem[]>*/ {
    let command = new GetCollectionItemsCommand(this, true);
    return command.execute();
  }
}

export { ZoteroCollection };
