import { state } from '../state'
import type { Option, Template } from '../types'

const getNameFromPackageJson = () => {
  if (typeof state.packageJson.author === 'string') {
    return state.packageJson.author
  }

  if (typeof state.packageJson.author === 'object' && typeof state.packageJson.author.name === 'string') {
    return state.packageJson.author.name
  }

  return state.packageJson.name
}

function listAuthors(authors?: ({ year?: string; name?: string } | string)[]) {
  if (!authors) {
    return `${new Date().getFullYear()} ${getNameFromPackageJson()}`
  }

  if (!Array.isArray(authors)) {
    // biome-ignore lint/style/noParameterAssign: Converts to array.
    authors = [authors]
  }

  return authors.reduce((acc, author, index) => {
    const authorString =
      typeof author === 'string' ? author : `${author.year || new Date().getFullYear()} ${author.name || getNameFromPackageJson()}`
    return acc + (index > 0 ? ', ' : '') + authorString
  }, '')
}

const mitLicense = (option?: Option & { authors?: { year?: string; name?: string }[] }) => `MIT License

Copyright (c) ${listAuthors(option?.authors)}

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`

// Creative Commons CC0 1.0 UNIVERSAL license, does not waive rights given under the publishing jurisdiction of the author.
const publicDomainLicense = () => `# CC0 1.0 Universal

## No Copyright

The person who associated a work with this deed has dedicated the work to the public domain by waiving all of his or her rights to the work worldwide under copyright law, including all related and neighboring rights, to the extent allowed by law.

You can copy, modify, distribute and perform the work, even for commercial purposes, all without asking permission. See Other Information below.

## Other Information

In no way are the patent or trademark rights of any person affected by CC0, nor are the rights that other persons may have in the work or in how the work is used, such as publicity or privacy rights.
Unless expressly stated otherwise, the person who associated a work with this deed makes no warranties about the work, and disclaims liability for all uses of the work, to the fullest extent permitted by applicable law.
When using or citing the work, you should not imply [endorsement](https://creativecommons.org/publicdomain/zero/1.0/?ref=chooser-v1#ref-endorsement) by the author or the affirmer.

[See the legal code](https://creativecommons.org/publicdomain/zero/1.0/legalcode.en)`

// Creative Commons CC BY-NC 4.0 license, contents can be shared with attribution but not used for commercial purposes.
const commercialLicense = () => `# ATTRIBUTION-NONCOMMERCIAL 4.0 INTERNATIONAL

## You are free to:

**Share** — copy and redistribute the material in any medium or format

**Adapt** — remix, transform, and build upon the material

The licensor cannot revoke these freedoms as long as you follow the license terms.

## Under the following terms:

**Attribution** — You must give [appropriate credit](https://creativecommons.org/licenses/by-nc/4.0/deed.en#ref-appropriate-credit), provide a link to the license, and [indicate if changes were made](https://creativecommons.org/licenses/by-nc/4.0/deed.en#ref-indicate-changes). You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.

**NonCommercial** — You may not use the material for [commercial purposes](https://creativecommons.org/licenses/by-nc/4.0/deed.en#ref-commercial-purposes).

**No additional restrictions** — You may not apply legal terms or [technological measures](https://creativecommons.org/licenses/by-nc/4.0/deed.en#ref-technological-measures) that legally restrict others from doing anything the license permits.

## Notices:

You do not have to comply with the license for elements of the material in the public domain or where your use is permitted by an applicable [exception or limitation](https://creativecommons.org/licenses/by-nc/4.0/deed.en#ref-exception-or-limitation).

No warranties are given. The license may not give you all of the permissions necessary for your intended use. For example, other rights such as [publicity, privacy, or moral rights](https://creativecommons.org/licenses/by-nc/4.0/deed.en#ref-publicity-privacy-or-moral-rights) may limit how you use the material.

[See the legal code](https://creativecommons.org/licenses/by-nc/4.0/legalcode.en)`

export const templates: Template<string> = {
  recommended: mitLicense,
  mit: mitLicense,
  MIT: mitLicense,
  public: publicDomainLicense,
  cc0: publicDomainLicense,
  commercial: commercialLicense,
  ccbync4: commercialLicense,
}

export function createFile(content: string | object) {
  return { name: 'LICENSE.md', contents: typeof content === 'string' ? content : (content as { extends: string }).extends }
}
