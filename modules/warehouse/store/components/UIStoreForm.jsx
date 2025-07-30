"use client";

import React from "react";
import UITopic from "@/components/topic/UITopic";
import {
  Input,
  Textarea,
  Button,
  Select,
  SelectItem,
  Accordion,
  AccordionItem,
} from "@heroui/react";

export default function UIStoreForm({
  headerContent,
  formRef,
  onSubmit,
  errors,
  formData,
  handleInputChange,
  isUpdate,
  operatedBy,
  zones,
  onAddZone,
  onAddAisle,
  onAddRack,
  onAddLevel,
  onAddBin,
  handleNestedChange,
}) {
  const handleFinalSubmit = (e) => {
    const hiddenInput = document.createElement("input");
    hiddenInput.type = "hidden";
    hiddenInput.name = "zones";
    hiddenInput.value = JSON.stringify(zones);
    formRef.current.appendChild(hiddenInput);
    onSubmit(e);
  };

  return (
    <>
      <UITopic Topic={headerContent} />
      <form
        ref={formRef}
        onSubmit={handleFinalSubmit}
        className="flex flex-col items-center justify-start w-full h-full p-2 gap-2 overflow-auto"
      >
        <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
          <div className="flex w-full gap-2">
            <Input
              name="storeCode"
              label="Store Code"
              labelPlacement="outside"
              placeholder="Please Enter Data"
              variant="bordered"
              radius="full"
              value={formData.storeCode || ""}
              onChange={handleInputChange("storeCode")}
              isInvalid={!!errors.storeCode}
              errorMessage={errors.storeCode}
            />
            <Input
              name="storeName"
              label="Store"
              labelPlacement="outside"
              placeholder="Please Enter Data"
              variant="bordered"
              radius="full"
              value={formData.storeName || ""}
              onChange={handleInputChange("storeName")}
              isInvalid={!!errors.storeName}
              errorMessage={errors.storeName}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
          <div className="flex w-full gap-2">
            <Input
              name="storeLocation"
              label="Location"
              labelPlacement="outside"
              placeholder="Please Enter Data"
              variant="bordered"
              radius="full"
              value={formData.storeLocation || ""}
              onChange={handleInputChange("storeLocation")}
              isInvalid={!!errors.storeLocation}
              errorMessage={errors.storeLocation}
            />
            <Textarea
              name="storeDescription"
              label="Description"
              labelPlacement="outside"
              placeholder="Please Enter Data"
              variant="bordered"
              radius="lg"
              className="w-full"
              value={formData.storeDescription || ""}
              onChange={handleInputChange("storeDescription")}
              isInvalid={!!errors.storeDescription}
              errorMessage={errors.storeDescription}
            />
          </div>
        </div>

        {isUpdate && (
          <div className="flex w-full px-2">
            <Select
              name="storeStatus"
              label="Store Status"
              labelPlacement="outside"
              placeholder="Please Enter Data"
              variant="bordered"
              radius="full"
              selectedKeys={formData.storeStatus ? [formData.storeStatus] : []}
              onSelectionChange={(keys) =>
                handleInputChange("storeStatus")([...keys][0])
              }
              isInvalid={!!errors.storeStatus}
              errorMessage={errors.storeStatus}
            >
              <SelectItem key="Enable">Enable</SelectItem>
              <SelectItem key="Disable">Disable</SelectItem>
            </Select>
          </div>
        )}

        <div className="flex w-full lg:w-6/12 justify-end px-2">
          <Input
            name="operatedBy"
            type="text"
            label="Operated By"
            labelPlacement="outside"
            placeholder="Please Enter Data"
            variant="flat"
            radius="full"
            isReadOnly
            value={operatedBy}
          />
        </div>

        <div className="w-full px-2 py-4">
          <div className="flex justify-between items-center">
            <p className="text-xl font-semibold">Zones</p>
            <Button onClick={onAddZone} size="sm" color="success" radius="full">
              + Add Zone
            </Button>
          </div>

          <Accordion variant="splitted">
            {zones.map((zone, zi) => (
              <AccordionItem
                key={zi}
                title={`Zone ${zi + 1}: ${zone.zoneName || "-"}`}
              >
                <Input
                  label="Zone Code"
                  placeholder="Please Enter Data"
                  value={zone.zoneCode}
                  onChange={(e) =>
                    handleNestedChange(zi, ["zoneCode"], e.target.value)
                  }
                />
                <Input
                  label="Zone Name"
                  placeholder="Please Enter Data"
                  value={zone.zoneName}
                  onChange={(e) =>
                    handleNestedChange(zi, ["zoneName"], e.target.value)
                  }
                />
                <Textarea
                  label="Zone Description"
                  placeholder="Please Enter Data"
                  value={zone.zoneDescription}
                  onChange={(e) =>
                    handleNestedChange(zi, ["zoneDescription"], e.target.value)
                  }
                />
                <Button
                  onClick={() => onAddAisle(zi)}
                  size="sm"
                  color="secondary"
                  radius="full"
                >
                  + Add Aisle
                </Button>

                {zone.aisles.map((aisle, ai) => (
                  <div key={ai} className="ml-4 border-l-2 pl-4 mt-2">
                    <Input
                      label="Aisle Code"
                      placeholder="Please Enter Data"
                      value={aisle.aisleCode}
                      onChange={(e) =>
                        handleNestedChange(
                          zi,
                          ["aisles", ai, "aisleCode"],
                          e.target.value
                        )
                      }
                    />
                    <Input
                      label="Aisle Name"
                      placeholder="Please Enter Data"
                      value={aisle.aisleName}
                      onChange={(e) =>
                        handleNestedChange(
                          zi,
                          ["aisles", ai, "aisleName"],
                          e.target.value
                        )
                      }
                    />
                    <Button
                      onClick={() => onAddRack(zi, ai)}
                      size="sm"
                      color="secondary"
                      radius="full"
                    >
                      + Add Rack
                    </Button>

                    {aisle.racks.map((rack, ri) => (
                      <div key={ri} className="ml-4 border-l-2 pl-4 mt-2">
                        <Input
                          label="Rack Code"
                          placeholder="Please Enter Data"
                          value={rack.rackCode}
                          onChange={(e) =>
                            handleNestedChange(
                              zi,
                              ["aisles", ai, "racks", ri, "rackCode"],
                              e.target.value
                            )
                          }
                        />
                        <Input
                          label="Rack Name"
                          placeholder="Please Enter Data"
                          value={rack.rackName}
                          onChange={(e) =>
                            handleNestedChange(
                              zi,
                              ["aisles", ai, "racks", ri, "rackName"],
                              e.target.value
                            )
                          }
                        />
                        <Button
                          onClick={() => onAddLevel(zi, ai, ri)}
                          size="sm"
                          color="secondary"
                          radius="full"
                        >
                          + Add Level
                        </Button>

                        {rack.levels.map((level, li) => (
                          <div key={li} className="ml-4 border-l-2 pl-4 mt-2">
                            <Input
                              label="Level Code"
                              placeholder="Please Enter Data"
                              value={level.levelCode}
                              onChange={(e) =>
                                handleNestedChange(
                                  zi,
                                  [
                                    "aisles",
                                    ai,
                                    "racks",
                                    ri,
                                    "levels",
                                    li,
                                    "levelCode",
                                  ],
                                  e.target.value
                                )
                              }
                            />
                            <Input
                              label="Level Name"
                              placeholder="Please Enter Data"
                              value={level.levelName}
                              onChange={(e) =>
                                handleNestedChange(
                                  zi,
                                  [
                                    "aisles",
                                    ai,
                                    "racks",
                                    ri,
                                    "levels",
                                    li,
                                    "levelName",
                                  ],
                                  e.target.value
                                )
                              }
                            />
                            <Button
                              onClick={() => onAddBin(zi, ai, ri, li)}
                              size="sm"
                              color="secondary"
                              radius="full"
                            >
                              + Add Bin
                            </Button>

                            {level.bins.map((bin, bi) => (
                              <div
                                key={bi}
                                className="ml-4 border-l-2 pl-4 mt-2"
                              >
                                <Input
                                  label="Bin Code"
                                  placeholder="Please Enter Data"
                                  value={bin.binCode}
                                  onChange={(e) =>
                                    handleNestedChange(
                                      zi,
                                      [
                                        "aisles",
                                        ai,
                                        "racks",
                                        ri,
                                        "levels",
                                        li,
                                        "bins",
                                        bi,
                                        "binCode",
                                      ],
                                      e.target.value
                                    )
                                  }
                                />
                                <Input
                                  label="Row"
                                  placeholder="Please Enter Data"
                                  value={bin.binRow}
                                  onChange={(e) =>
                                    handleNestedChange(
                                      zi,
                                      [
                                        "aisles",
                                        ai,
                                        "racks",
                                        ri,
                                        "levels",
                                        li,
                                        "bins",
                                        bi,
                                        "binRow",
                                      ],
                                      e.target.value
                                    )
                                  }
                                />
                                <Input
                                  label="Type"
                                  placeholder="Please Enter Data"
                                  value={bin.binType}
                                  onChange={(e) =>
                                    handleNestedChange(
                                      zi,
                                      [
                                        "aisles",
                                        ai,
                                        "racks",
                                        ri,
                                        "levels",
                                        li,
                                        "bins",
                                        bi,
                                        "binType",
                                      ],
                                      e.target.value
                                    )
                                  }
                                />
                                <Input
                                  label="Usage"
                                  placeholder="Please Enter Data"
                                  value={bin.binUsage}
                                  onChange={(e) =>
                                    handleNestedChange(
                                      zi,
                                      [
                                        "aisles",
                                        ai,
                                        "racks",
                                        ri,
                                        "levels",
                                        li,
                                        "bins",
                                        bi,
                                        "binUsage",
                                      ],
                                      e.target.value
                                    )
                                  }
                                />
                                <Input
                                  label="Capacity"
                                  type="number"
                                  placeholder="Please Enter Data"
                                  value={bin.binCapacity}
                                  onChange={(e) =>
                                    handleNestedChange(
                                      zi,
                                      [
                                        "aisles",
                                        ai,
                                        "racks",
                                        ri,
                                        "levels",
                                        li,
                                        "bins",
                                        bi,
                                        "binCapacity",
                                      ],
                                      parseInt(e.target.value)
                                    )
                                  }
                                />
                                <Input
                                  label="X"
                                  type="number"
                                  placeholder="Please Enter Data"
                                  value={bin.binPosX}
                                  onChange={(e) =>
                                    handleNestedChange(
                                      zi,
                                      [
                                        "aisles",
                                        ai,
                                        "racks",
                                        ri,
                                        "levels",
                                        li,
                                        "bins",
                                        bi,
                                        "binPosX",
                                      ],
                                      parseFloat(e.target.value)
                                    )
                                  }
                                />
                                <Input
                                  label="Y"
                                  type="number"
                                  placeholder="Please Enter Data"
                                  value={bin.binPosY}
                                  onChange={(e) =>
                                    handleNestedChange(
                                      zi,
                                      [
                                        "aisles",
                                        ai,
                                        "racks",
                                        ri,
                                        "levels",
                                        li,
                                        "bins",
                                        bi,
                                        "binPosY",
                                      ],
                                      parseFloat(e.target.value)
                                    )
                                  }
                                />
                                <Input
                                  label="Z"
                                  type="number"
                                  placeholder="Please Enter Data"
                                  value={bin.binPosZ}
                                  onChange={(e) =>
                                    handleNestedChange(
                                      zi,
                                      [
                                        "aisles",
                                        ai,
                                        "racks",
                                        ri,
                                        "levels",
                                        li,
                                        "bins",
                                        bi,
                                        "binPosZ",
                                      ],
                                      parseFloat(e.target.value)
                                    )
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="flex justify-end w-full p-2">
          <Button
            type="submit"
            color="primary"
            radius="full"
            className="w-full lg:w-3/12 p-3 gap-2"
          >
            Save
          </Button>
        </div>
      </form>
    </>
  );
}
