"use client";

import React from "react";
import UITopic from "@/components/topic/UITopic";
import { Input, Textarea, Button, Select, SelectItem } from "@heroui/react";

export default function UIStoreForm({
  headerContent,
  formRef,
  onSubmit,
  errors,
  formData,
  handleInputChange,
  setFormData,
  isUpdate,
  operatedBy,
}) {
  const zones = formData.zones || [];

  const updateZones = (newZones) =>
    setFormData({ ...formData, zones: newZones });

  const handleNestedChange = (zi, path, value) => {
    const newZones = [...zones];
    let target = newZones[zi];
    for (let i = 0; i < path.length - 1; i++) {
      target = target[path[i]];
    }
    target[path[path.length - 1]] = value;
    updateZones(newZones);
  };

  const onAddZone = () =>
    updateZones([
      ...zones,
      { zoneCode: "", zoneName: "", zoneDescription: "", aisles: [] },
    ]);

  const onAddAisle = (zi) => {
    const newZones = [...zones];
    newZones[zi].aisles.push({ aisleCode: "", aisleName: "", racks: [] });
    updateZones(newZones);
  };

  const onAddRack = (zi, ai) => {
    const newZones = [...zones];
    newZones[zi].aisles[ai].racks.push({
      rackCode: "",
      rackName: "",
      levels: [],
    });
    updateZones(newZones);
  };

  const onAddLevel = (zi, ai, ri) => {
    const newZones = [...zones];
    newZones[zi].aisles[ai].racks[ri].levels.push({
      levelCode: "",
      levelName: "",
      bins: [],
    });
    updateZones(newZones);
  };

  const onAddBin = (zi, ai, ri, li) => {
    const newZones = [...zones];
    newZones[zi].aisles[ai].racks[ri].levels[li].bins.push({
      binCode: "",
      binRow: "",
      binType: "",
      binUsage: "",
      binCapacity: 0,
      binPosX: 0,
      binPosY: 0,
      binPosZ: 0,
    });
    updateZones(newZones);
  };

  return (
    <>
      <UITopic Topic={headerContent} />
      <form
        ref={formRef}
        onSubmit={onSubmit}
        className="flex flex-col items-center justify-start w-full h-full p-2 gap-2 overflow-auto"
      >
        <div className="flex flex-col lg:flex-row items-start justify-start w-full p-2 gap-2">
          <div className="flex items-center justify-center h-full px-8 py-4 gap-2 bg-black text-white font-semibold rounded-lg">
            Store
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
          <div className="flex items-center justify-center w-full h-full p-2 gap-2">
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
          </div>
          <div className="flex items-center justify-center w-full h-full p-2 gap-2">
            <Input
              name="storeName"
              label="Store Name"
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
          <div className="flex items-center justify-center w-full h-full p-2 gap-2">
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
          </div>
          <div className="flex items-center justify-center w-full h-full p-2 gap-2">
            <Input
              name="storeDescription"
              label="Description"
              labelPlacement="outside"
              placeholder="Please Enter Data"
              variant="bordered"
              radius="full"
              value={formData.storeDescription || ""}
              onChange={handleInputChange("storeDescription")}
              isInvalid={!!errors.storeDescription}
              errorMessage={errors.storeDescription}
            />
          </div>
        </div>

        {isUpdate && (
          <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
              <Select
                name="storeStatus"
                label="Store Status"
                labelPlacement="outside"
                placeholder="Please Enter Data"
                variant="bordered"
                radius="full"
                selectedKeys={
                  formData.storeStatus ? [formData.storeStatus] : []
                }
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
          </div>
        )}

        <div className="flex flex-col lg:flex-row items-center justify-end w-full p-2 gap-2">
          <div className="flex items-center justify-center w-full h-full lg:w-6/12 p-2 gap-2">
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
        </div>

        <div className="flex flex-col items-center justify-center w-full p-2 gap-2">
          <div className="flex flex-row items-center justify-between w-full h-full p-2 gap-2">
            <div className="flex items-center justify-center h-full px-8 py-4 gap-2 bg-black text-white font-semibold rounded-lg">
              Zones
            </div>
            <div className="flex items-center justify-center h-full p-2 gap-2">
              <Button
                onPress={onAddZone}
                color="secondary"
                radius="full"
                className="w-full h-full p-3 gap-2"
              >
                Add Zone
              </Button>
            </div>
          </div>
          <div className="flex flex-col w-full gap-4">
            {zones.map((zone, zi) => (
              <div
                key={zi}
                className="flex flex-col w-full p-4 border-2 border-danger border-dashed rounded-lg shadow-sm"
              >
                <div className="text-lg font-bold text-danger mb-2">
                  Zone {zone.zoneCode || zi + 1}
                </div>

                <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
                  <Input
                    label="Zone Code"
                    labelPlacement="outside"
                    placeholder="Please Enter Data"
                    variant="bordered"
                    radius="full"
                    value={zone.zoneCode}
                    onChange={(e) =>
                      handleNestedChange(zi, ["zoneCode"], e.target.value)
                    }
                  />
                  <Input
                    label="Zone Name"
                    labelPlacement="outside"
                    placeholder="Please Enter Data"
                    variant="bordered"
                    radius="full"
                    value={zone.zoneName}
                    onChange={(e) =>
                      handleNestedChange(zi, ["zoneName"], e.target.value)
                    }
                  />
                </div>

                <Textarea
                  label="Zone Description"
                  labelPlacement="outside"
                  placeholder="Please Enter Data"
                  variant="bordered"
                  radius="lg"
                  value={zone.zoneDescription}
                  onChange={(e) =>
                    handleNestedChange(zi, ["zoneDescription"], e.target.value)
                  }
                />

                <div className="flex justify-end w-full mt-2">
                  <Button
                    onPress={() => onAddAisle(zi)}
                    color="secondary"
                    radius="full"
                    className="w-full sm:w-auto p-3"
                  >
                    + Add Aisle
                  </Button>
                </div>

                {zone.aisles.map((aisle, ai) => (
                  <div key={ai} className="ml-4 border-l-2 pl-4 mt-4">
                    <div className="text-base font-semibold text-blue-600 mb-2">
                      Aisle {aisle.aisleCode || ai + 1}
                    </div>

                    <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
                      <Input
                        label="Aisle Code"
                        labelPlacement="outside"
                        placeholder="Please Enter Data"
                        variant="bordered"
                        radius="full"
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
                        labelPlacement="outside"
                        placeholder="Please Enter Data"
                        variant="bordered"
                        radius="full"
                        value={aisle.aisleName}
                        onChange={(e) =>
                          handleNestedChange(
                            zi,
                            ["aisles", ai, "aisleName"],
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="flex justify-end w-full mt-2">
                      <Button
                        onPress={() => onAddRack(zi, ai)}
                        color="secondary"
                        radius="full"
                        className="w-full sm:w-auto p-3"
                      >
                        + Add Rack
                      </Button>
                    </div>

                    {aisle.racks.map((rack, ri) => (
                      <div key={ri} className="ml-4 border-l-2 pl-4 mt-4">
                        <div className="text-base font-semibold text-orange-600 mb-2">
                          Rack {rack.rackCode || ri + 1}
                        </div>

                        <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
                          <Input
                            label="Rack Code"
                            labelPlacement="outside"
                            placeholder="Please Enter Data"
                            variant="bordered"
                            radius="full"
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
                            labelPlacement="outside"
                            placeholder="Please Enter Data"
                            variant="bordered"
                            radius="full"
                            value={rack.rackName}
                            onChange={(e) =>
                              handleNestedChange(
                                zi,
                                ["aisles", ai, "racks", ri, "rackName"],
                                e.target.value
                              )
                            }
                          />
                        </div>

                        <div className="flex justify-end w-full mt-2">
                          <Button
                            onPress={() => onAddLevel(zi, ai, ri)}
                            color="secondary"
                            radius="full"
                            className="w-full sm:w-auto p-3"
                          >
                            + Add Level
                          </Button>
                        </div>

                        {rack.levels.map((level, li) => (
                          <div key={li} className="ml-4 border-l-2 pl-4 mt-4">
                            <div className="text-base font-semibold text-yellow-600 mb-2">
                              Level {level.levelCode || li + 1}
                            </div>

                            <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
                              <Input
                                label="Level Code"
                                labelPlacement="outside"
                                placeholder="Please Enter Data"
                                variant="bordered"
                                radius="full"
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
                                labelPlacement="outside"
                                placeholder="Please Enter Data"
                                variant="bordered"
                                radius="full"
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
                            </div>

                            <div className="flex justify-end w-full mt-2">
                              <Button
                                onPress={() => onAddBin(zi, ai, ri, li)}
                                color="secondary"
                                radius="full"
                                className="w-full sm:w-auto p-3"
                              >
                                + Add Bin
                              </Button>
                            </div>

                            {level.bins.map((bin, bi) => (
                              <div
                                key={bi}
                                className="ml-4 border-l-2 pl-4 mt-4"
                              >
                                <div className="text-base font-semibold text-red-600 mb-2">
                                  Bin {bin.binCode || bi + 1}
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 w-full">
                                  {[
                                    ["Bin Code", "binCode"],
                                    ["Row", "binRow"],
                                    ["Type", "binType"],
                                    ["Usage", "binUsage"],
                                    ["Capacity", "binCapacity", "number"],
                                    ["X", "binPosX", "number"],
                                    ["Y", "binPosY", "number"],
                                    ["Z", "binPosZ", "number"],
                                  ].map(([label, key, type = "text"]) => (
                                    <div key={key} className="p-2">
                                      <Input
                                        label={label}
                                        labelPlacement="outside"
                                        placeholder="Please Enter Data"
                                        variant="bordered"
                                        radius="full"
                                        type={type}
                                        value={bin[key]}
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
                                              key,
                                            ],
                                            type === "number"
                                              ? parseFloat(e.target.value)
                                              : e.target.value
                                          )
                                        }
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-end w-full p-2 gap-2">
          <div className="flex items-center justify-center h-full p-2 gap-2">
            <Button
              type="submit"
              color="primary"
              radius="full"
              className="w-full h-full p-3 gap-2"
            >
              Save
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
