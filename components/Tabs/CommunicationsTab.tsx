import React, { useState } from "react";
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/16/solid'

export default function ConnectionSettings() {
  const [open, setOpen] = useState(0);

  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-left">Who can connect with you?</h2>
      <p className="text-sm text-gray-600 mb-6 text-left">
        He moonlights difficult engrossed it, sportsmen. Interested has all Devonshire difficulty gay assistance joy.
        Unaffected at ye of compliment alteration to.
      </p>

      {/* Accordion for Connection Request */}
      <div className="border-solid border rounded-lg">
        <Disclosure as="div" className="" defaultOpen={true}>
            <DisclosureButton className="group flex w-full items-center justify-between p-5 border-b">
              <span className="text-sm/6 font-medium text-black">
                What is your refund policy?
              </span>
              <ChevronDownIcon className="size-5 fill-black/60 group-data-[open]:rotate-180" />
            </DisclosureButton>
            <DisclosurePanel className="mt-2 p-3 text-sm/5 text-black/50 text-left border-b">
              If you're unhappy with your purchase, we'll refund you in full.
            </DisclosurePanel>
          </Disclosure>
          <Disclosure as="div" className="">
            <DisclosureButton className="group flex w-full items-center justify-between p-5 border-b">
              <span className="text-sm/6 font-medium text-black">
                Do you offer technical support?
              </span>
              <ChevronDownIcon className="size-5 fill-black/60 group-data-[open]:rotate-180" />
            </DisclosureButton>
            <DisclosurePanel className="mt-2 text-sm/5 text-black/50 text-left p-3 border-b">No.</DisclosurePanel>
          </Disclosure>
        </div>
      {/* Save Changes Button */}
      <div className="mt-8 flex justify-end">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Save changes
        </button>
      </div>
    </div>
  );
}