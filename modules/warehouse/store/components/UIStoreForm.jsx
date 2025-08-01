"use client";

import React from "react";
import UITopic from "@/components/topic/UITopic";
import { Input, Button, Select, SelectItem } from "@heroui/react";
import { Plus, Trash2 } from "lucide-react";

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
  onNestedChange,
}) {
  const handleFieldChange = (path, value) => {
    if (onNestedChange) {
      onNestedChange(path, value);
    } else {
      handleInputChange(path)(value);
    }
  };

  const addZone = () => {
    const newZone = {
      zoneId: undefined,
      zoneCode: "",
      zoneName: "",
      zoneDescription: "",
      zoneStatus: "",
      zoneAisles: [],
    };
    setFormData({
      ...formData,
      storeZones: [...(formData.storeZones || []), newZone],
    });
  };

  const removeZone = (zoneIndex) => {
    const updatedZones = [...formData.storeZones];
    updatedZones.splice(zoneIndex, 1);
    setFormData({ ...formData, storeZones: updatedZones });
  };

  const addAisle = (zoneIndex) => {
    const updatedZones = [...formData.storeZones];
    updatedZones[zoneIndex].zoneAisles = [
      ...(updatedZones[zoneIndex].zoneAisles || []),
      {
        aisleId: undefined,
        aisleCode: "",
        aisleName: "",
        aisleDescription: "",
        aisleRacks: [],
      },
    ];
    setFormData({ ...formData, storeZones: updatedZones });
  };

  const removeAisle = (zoneIndex, aisleIndex) => {
    const updatedZones = [...formData.storeZones];
    updatedZones[zoneIndex].zoneAisles.splice(aisleIndex, 1);
    setFormData({ ...formData, storeZones: updatedZones });
  };

  const addRack = (zoneIndex, aisleIndex) => {
    const updatedZones = [...formData.storeZones];
    updatedZones[zoneIndex].zoneAisles[aisleIndex].aisleRacks = [
      ...(updatedZones[zoneIndex].zoneAisles[aisleIndex].aisleRacks || []),
      {
        rackId: undefined,
        rackCode: "",
        rackName: "",
        rackDescription: "",
        rackLevels: [],
      },
    ];
    setFormData({ ...formData, storeZones: updatedZones });
  };

  const removeRack = (zoneIndex, aisleIndex, rackIndex) => {
    const updatedZones = [...formData.storeZones];
    updatedZones[zoneIndex].zoneAisles[aisleIndex].aisleRacks.splice(
      rackIndex,
      1
    );
    setFormData({ ...formData, storeZones: updatedZones });
  };

  const addLevel = (zoneIndex, aisleIndex, rackIndex) => {
    const updatedZones = [...formData.storeZones];
    updatedZones[zoneIndex].zoneAisles[aisleIndex].aisleRacks[
      rackIndex
    ].rackLevels = [
      ...(updatedZones[zoneIndex].zoneAisles[aisleIndex].aisleRacks[rackIndex]
        .rackLevels || []),
      {
        levelId: undefined,
        levelCode: "",
        levelName: "",
        levelDescription: "",
        levelBins: [],
      },
    ];
    setFormData({ ...formData, storeZones: updatedZones });
  };

  const removeLevel = (zoneIndex, aisleIndex, rackIndex, levelIndex) => {
    const updatedZones = [...formData.storeZones];
    updatedZones[zoneIndex].zoneAisles[aisleIndex].aisleRacks[
      rackIndex
    ].rackLevels.splice(levelIndex, 1);
    setFormData({ ...formData, storeZones: updatedZones });
  };

  const addBin = (zoneIndex, aisleIndex, rackIndex, levelIndex) => {
    const updatedZones = [...formData.storeZones];
    updatedZones[zoneIndex].zoneAisles[aisleIndex].aisleRacks[
      rackIndex
    ].rackLevels[levelIndex].levelBins = [
      ...(updatedZones[zoneIndex].zoneAisles[aisleIndex].aisleRacks[rackIndex]
        .rackLevels[levelIndex].levelBins || []),
      {
        binId: undefined,
        binCode: "",
        binDescription: "",
        binRow: "",
        binType: "",
        binUsage: "",
        binCapacity: "",
        binRfidTagId: "",
        binStatus: "",
        binFillRate: 0.0,
        binPosX: 0.0,
        binPosY: 0.0,
        binPosZ: 0.0,
      },
    ];
    setFormData({ ...formData, storeZones: updatedZones });
  };

  const removeBin = (
    zoneIndex,
    aisleIndex,
    rackIndex,
    levelIndex,
    binIndex
  ) => {
    const updatedZones = [...formData.storeZones];
    updatedZones[zoneIndex].zoneAisles[aisleIndex].aisleRacks[
      rackIndex
    ].rackLevels[levelIndex].levelBins.splice(binIndex, 1);
    setFormData({ ...formData, storeZones: updatedZones });
  };

  const renderZoneSection = (zone, zoneIndex) => (
    <div
      key={zoneIndex}
      className="flex flex-col items-center justify-center w-full h-full p-2 gap-2 border-1 border-default rounded-lg"
    >
      <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-2">
        <div className="flex items-center justify-start w-full h-full p-2 gap-2 font-semibold">
          Zone : {zone.zoneCode || ""}
        </div>
        <div className="flex items-center justify-center p-2 gap-2">
          <Button
            type="button"
            color="danger"
            radius="full"
            className="min-w-12 min-h-12 p-2 gap-2 rounded-full"
            onPress={() => removeZone(zoneIndex)}
          >
            <Trash2 />
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center w-full h-full p-2 gap-2">
        <div className="flex items-center justify-center w-full h-full p-2 gap-2">
          <Input
            label="Zone Code"
            labelPlacement="outside"
            placeholder="Enter Zone Code"
            variant="bordered"
            color="default"
            radius="full"
            value={zone.zoneCode || ""}
            onChange={(e) =>
              handleFieldChange(
                `storeZones.${zoneIndex}.zoneCode`,
                e.target.value
              )
            }
            isInvalid={!!errors?.storeZones?.[zoneIndex]?.zoneCode}
            errorMessage={errors?.storeZones?.[zoneIndex]?.zoneCode}
          />
        </div>
        <div className="flex items-center justify-center w-full h-full p-2 gap-2">
          <Input
            label="Zone Name"
            labelPlacement="outside"
            placeholder="Enter Zone Name"
            variant="bordered"
            color="default"
            radius="full"
            value={zone.zoneName || ""}
            onChange={(e) =>
              handleFieldChange(
                `storeZones.${zoneIndex}.zoneName`,
                e.target.value
              )
            }
            isInvalid={!!errors?.storeZones?.[zoneIndex]?.zoneName}
            errorMessage={errors?.storeZones?.[zoneIndex]?.zoneName}
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center w-full h-full p-2 gap-2">
        <div className="flex items-center justify-center w-full h-full p-2 gap-2">
          <Input
            label="Zone Description"
            labelPlacement="outside"
            placeholder="Enter Zone Description"
            variant="bordered"
            color="default"
            radius="full"
            value={zone.zoneDescription || ""}
            onChange={(e) =>
              handleFieldChange(
                `storeZones.${zoneIndex}.zoneDescription`,
                e.target.value
              )
            }
          />
        </div>
        <div className="flex items-center justify-center w-full h-full p-2 gap-2">
          <Select
            label="Zone Status"
            labelPlacement="outside"
            placeholder="Select Status"
            variant="bordered"
            color="default"
            radius="full"
            selectedKeys={[zone.zoneStatus || ""]}
            onSelectionChange={(keys) =>
              handleFieldChange(
                `storeZones.${zoneIndex}.zoneStatus`,
                [...keys][0]
              )
            }
            isInvalid={!!errors?.storeZones?.[zoneIndex]?.zoneStatus}
            errorMessage={errors?.storeZones?.[zoneIndex]?.zoneStatus}
          >
            <SelectItem key="Enable">Enable</SelectItem>
            <SelectItem key="Disable">Disable</SelectItem>
          </Select>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center w-full h-full gap-2">
        <div className="flex flex-row items-center justify-between w-full h-full p-2 gap-2">
          <div className="flex items-center justify-start w-full h-full p-2 gap-2 font-semibold">
            Aisles Info
          </div>
          <div className="flex items-center justify-center p-2 gap-2">
            <Button
              type="button"
              color="warning"
              radius="full"
              className="min-w-12 min-h-12 p-2 gap-2 rounded-full"
              onPress={() => addAisle(zoneIndex)}
            >
              <Plus />
            </Button>
          </div>
        </div>

        {zone.zoneAisles?.map((aisle, aisleIndex) => (
          <div
            key={aisleIndex}
            className="flex flex-col items-center justify-center w-full h-full p-2 gap-2 border-1 border-default rounded-lg"
          >
            <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-2">
              <div className="flex items-center justify-start w-full h-full p-2 gap-2 font-semibold">
                Aisle : {aisle.aisleCode || ""}
              </div>

              <div className="flex items-center justify-center p-2 gap-2">
                <Button
                  type="button"
                  color="danger"
                  radius="full"
                  className="min-w-12 min-h-12 p-2 gap-2 rounded-full"
                  onPress={() => removeAisle(zoneIndex, aisleIndex)}
                >
                  <Trash2 />
                </Button>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center w-full h-full gap-2">
              <div className="flex flex-col lg:flex-row items-center justify-center w-full h-full p-2 gap-2">
                <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                  <Input
                    label="Aisle Code"
                    labelPlacement="outside"
                    placeholder="Enter Aisle Code"
                    variant="bordered"
                    color="default"
                    radius="full"
                    value={aisle.aisleCode || ""}
                    onChange={(e) =>
                      handleFieldChange(
                        `storeZones.${zoneIndex}.zoneAisles.${aisleIndex}.aisleCode`,
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                  <Input
                    label="Aisle Name"
                    labelPlacement="outside"
                    placeholder="Enter Aisle Name"
                    variant="bordered"
                    color="default"
                    radius="full"
                    value={aisle.aisleName || ""}
                    onChange={(e) =>
                      handleFieldChange(
                        `storeZones.${zoneIndex}.zoneAisles.${aisleIndex}.aisleName`,
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col lg:flex-row items-center justify-center w-full h-full p-2 gap-2">
                <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                  <Input
                    label="Aisle Description"
                    labelPlacement="outside"
                    placeholder="Enter Aisle Description"
                    variant="bordered"
                    color="default"
                    radius="full"
                    value={aisle.aisleDescription || ""}
                    onChange={(e) =>
                      handleFieldChange(
                        `storeZones.${zoneIndex}.zoneAisles.${aisleIndex}.aisleDescription`,
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col items-center justify-center w-full h-full gap-2">
                <div className="flex flex-row items-center justify-between w-full h-full p-2 gap-2">
                  <div className="flex items-center justify-start w-full h-full p-2 gap-2 font-semibold">
                    Racks Info
                  </div>
                  <div className="flex items-center justify-center p-2 gap-2">
                    <Button
                      type="button"
                      color="warning"
                      radius="full"
                      className="min-w-12 min-h-12 p-2 gap-2 rounded-full"
                      onPress={() => addRack(zoneIndex, aisleIndex)}
                    >
                      <Plus />
                    </Button>
                  </div>
                </div>

                {aisle.aisleRacks?.map((rack, rackIndex) => (
                  <div
                    key={rackIndex}
                    className="flex flex-col items-center justify-center w-full h-full p-2 gap-2 border-1 border-default rounded-lg"
                  >
                    <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-2">
                      <div className="flex items-center justify-start w-full h-full p-2 gap-2 font-semibold">
                        Rack : {rack.rackCode || ""}
                      </div>

                      <div className="flex items-center justify-center p-2 gap-2">
                        <Button
                          type="button"
                          color="danger"
                          radius="full"
                          className="min-w-12 min-h-12 p-2 gap-2 rounded-full"
                          onPress={() =>
                            removeRack(zoneIndex, aisleIndex, rackIndex)
                          }
                        >
                          <Trash2 />
                        </Button>
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-center w-full h-full gap-2">
                      <div className="flex flex-col lg:flex-row items-center justify-center w-full h-full p-2 gap-2">
                        <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                          <Input
                            label="Rack Code"
                            labelPlacement="outside"
                            placeholder="Enter Rack Code"
                            variant="bordered"
                            color="default"
                            radius="full"
                            value={rack.rackCode || ""}
                            onChange={(e) =>
                              handleFieldChange(
                                `storeZones.${zoneIndex}.zoneAisles.${aisleIndex}.aisleRacks.${rackIndex}.rackCode`,
                                e.target.value
                              )
                            }
                            isInvalid={
                              !!errors?.storeZones?.[zoneIndex]?.zoneAisles?.[
                                aisleIndex
                              ]?.aisleRacks?.[rackIndex]?.rackCode
                            }
                            errorMessage={
                              errors?.storeZones?.[zoneIndex]?.zoneAisles?.[
                                aisleIndex
                              ]?.aisleRacks?.[rackIndex]?.rackCode
                            }
                          />
                        </div>
                        <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                          <Input
                            label="Rack Name"
                            labelPlacement="outside"
                            placeholder="Enter Rack Name"
                            variant="bordered"
                            color="default"
                            radius="full"
                            value={rack.rackName || ""}
                            onChange={(e) =>
                              handleFieldChange(
                                `storeZones.${zoneIndex}.zoneAisles.${aisleIndex}.aisleRacks.${rackIndex}.rackName`,
                                e.target.value
                              )
                            }
                            isInvalid={
                              !!errors?.storeZones?.[zoneIndex]?.zoneAisles?.[
                                aisleIndex
                              ]?.aisleRacks?.[rackIndex]?.rackName
                            }
                            errorMessage={
                              errors?.storeZones?.[zoneIndex]?.zoneAisles?.[
                                aisleIndex
                              ]?.aisleRacks?.[rackIndex]?.rackName
                            }
                          />
                        </div>
                      </div>

                      <div className="flex flex-col lg:flex-row items-center justify-center w-full h-full p-2 gap-2">
                        <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                          <Input
                            label="Rack Description"
                            labelPlacement="outside"
                            placeholder="Enter Rack Description"
                            variant="bordered"
                            color="default"
                            radius="full"
                            value={rack.rackDescription || ""}
                            onChange={(e) =>
                              handleFieldChange(
                                `storeZones.${zoneIndex}.zoneAisles.${aisleIndex}.aisleRacks.${rackIndex}.rackDescription`,
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>

                      <div className="flex flex-col items-center justify-center w-full h-full gap-2">
                        <div className="flex flex-row items-center justify-between w-full h-full p-2 gap-2">
                          <div className="flex items-center justify-start w-full h-full p-2 gap-2 font-semibold">
                            Levels Info
                          </div>
                          <div className="flex items-center justify-center p-2 gap-2">
                            <Button
                              type="button"
                              color="warning"
                              radius="full"
                              className="min-w-12 min-h-12 p-2 gap-2 rounded-full"
                              onPress={() =>
                                addLevel(zoneIndex, aisleIndex, rackIndex)
                              }
                            >
                              <Plus />
                            </Button>
                          </div>
                        </div>

                        {rack.rackLevels?.map((level, levelIndex) => (
                          <div
                            key={levelIndex}
                            className="flex flex-col items-center justify-center w-full h-full p-2 gap-2 border-1 border-default rounded-lg"
                          >
                            <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-2">
                              <div className="flex items-center justify-start w-full h-full p-2 gap-2 font-semibold">
                                Level : {level.levelCode || ""}
                              </div>
                              <div className="flex items-center justify-center p-2 gap-2">
                                <Button
                                  type="button"
                                  color="danger"
                                  radius="full"
                                  className="min-w-12 min-h-12 p-2 gap-2 rounded-full"
                                  onPress={() =>
                                    removeLevel(
                                      zoneIndex,
                                      aisleIndex,
                                      rackIndex,
                                      levelIndex
                                    )
                                  }
                                >
                                  <Trash2 />
                                </Button>
                              </div>
                            </div>

                            <div className="flex flex-col items-center justify-center w-full h-full gap-2">
                              <div className="flex flex-col lg:flex-row items-center justify-center w-full h-full p-2 gap-2">
                                <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                                  <Input
                                    label="Level Code"
                                    labelPlacement="outside"
                                    placeholder="Enter Level Code"
                                    variant="bordered"
                                    color="default"
                                    radius="full"
                                    value={level.levelCode || ""}
                                    onChange={(e) =>
                                      handleFieldChange(
                                        `storeZones.${zoneIndex}.zoneAisles.${aisleIndex}.aisleRacks.${rackIndex}.rackLevels.${levelIndex}.levelCode`,
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                                <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                                  <Input
                                    label="Level Name"
                                    labelPlacement="outside"
                                    placeholder="Enter Level Name"
                                    variant="bordered"
                                    color="default"
                                    radius="full"
                                    value={level.levelName || ""}
                                    onChange={(e) =>
                                      handleFieldChange(
                                        `storeZones.${zoneIndex}.zoneAisles.${aisleIndex}.aisleRacks.${rackIndex}.rackLevels.${levelIndex}.levelName`,
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                              </div>

                              <div className="flex flex-col lg:flex-row items-center justify-center w-full h-full p-2 gap-2">
                                <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                                  <Input
                                    label="Level Description"
                                    labelPlacement="outside"
                                    placeholder="Enter Level Description"
                                    variant="bordered"
                                    color="default"
                                    radius="full"
                                    value={level.levelDescription || ""}
                                    onChange={(e) =>
                                      handleFieldChange(
                                        `storeZones.${zoneIndex}.zoneAisles.${aisleIndex}.aisleRacks.${rackIndex}.rackLevels.${levelIndex}.levelDescription`,
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                              </div>

                              <div className="flex flex-col items-center justify-center w-full h-full gap-2">
                                <div className="flex flex-row items-center justify-between w-full h-full p-2 gap-2">
                                  <div className="flex items-center justify-start w-full h-full p-2 gap-2 font-semibold">
                                    Bins Info
                                  </div>
                                  <div className="flex items-center justify-center p-2 gap-2">
                                    <Button
                                      type="button"
                                      color="warning"
                                      radius="full"
                                      className="min-w-12 min-h-12 p-2 gap-2 rounded-full"
                                      onPress={() =>
                                        addBin(
                                          zoneIndex,
                                          aisleIndex,
                                          rackIndex,
                                          levelIndex
                                        )
                                      }
                                    >
                                      <Plus />
                                    </Button>
                                  </div>
                                </div>

                                {level.levelBins?.map((bin, binIndex) => (
                                  <div
                                    key={binIndex}
                                    className="flex flex-col items-center justify-center w-full h-full p-2 gap-2 border-1 border-default rounded-lg"
                                  >
                                    <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-2">
                                      <div className="flex items-center justify-start w-full h-full p-2 gap-2 font-semibold">
                                        Bin : {bin.binCode || ""}
                                      </div>
                                      <div className="flex items-center justify-center p-2 gap-2">
                                        <Button
                                          type="button"
                                          color="danger"
                                          radius="full"
                                          className="min-w-12 min-h-12 p-2 gap-2 rounded-full"
                                          onPress={() =>
                                            removeBin(
                                              zoneIndex,
                                              aisleIndex,
                                              rackIndex,
                                              levelIndex,
                                              binIndex
                                            )
                                          }
                                        >
                                          <Trash2 />
                                        </Button>
                                      </div>
                                    </div>

                                    <div className="flex flex-col items-center justify-center w-full h-full gap-2">
                                      <div className="flex flex-col lg:flex-row items-center justify-center w-full h-full p-2 gap-2">
                                        <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                                          <Input
                                            label="Bin Code"
                                            labelPlacement="outside"
                                            placeholder="Enter Bin Code"
                                            variant="bordered"
                                            color="default"
                                            radius="full"
                                            value={bin.binCode || ""}
                                            onChange={(e) =>
                                              handleFieldChange(
                                                `storeZones.${zoneIndex}.zoneAisles.${aisleIndex}.aisleRacks.${rackIndex}.rackLevels.${levelIndex}.levelBins.${binIndex}.binCode`,
                                                e.target.value
                                              )
                                            }
                                          />
                                        </div>
                                        <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                                          <Input
                                            label="Bin Description"
                                            labelPlacement="outside"
                                            placeholder="Enter Bin Description"
                                            variant="bordered"
                                            color="default"
                                            radius="full"
                                            value={bin.binDescription || ""}
                                            onChange={(e) =>
                                              handleFieldChange(
                                                `storeZones.${zoneIndex}.zoneAisles.${aisleIndex}.aisleRacks.${rackIndex}.rackLevels.${levelIndex}.levelBins.${binIndex}.binDescription`,
                                                e.target.value
                                              )
                                            }
                                          />
                                        </div>
                                      </div>
                                      <div className="flex flex-col lg:flex-row items-center justify-center w-full h-full p-2 gap-2">
                                        <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                                          <Input
                                            label="Bin Row"
                                            labelPlacement="outside"
                                            placeholder="Enter Bin Row"
                                            variant="bordered"
                                            color="default"
                                            radius="full"
                                            type="text"
                                            value={bin.binRow || ""}
                                            onChange={(e) =>
                                              handleFieldChange(
                                                `storeZones.${zoneIndex}.zoneAisles.${aisleIndex}.aisleRacks.${rackIndex}.rackLevels.${levelIndex}.levelBins.${binIndex}.binRow`,
                                                e.target.value
                                              )
                                            }
                                          />
                                        </div>
                                        <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                                          <Select
                                            label="Bin Type"
                                            labelPlacement="outside"
                                            placeholder="Select Bin Type"
                                            variant="bordered"
                                            color="default"
                                            radius="full"
                                            selectedKeys={[
                                              bin.binType || "Normal",
                                            ]}
                                            onSelectionChange={(keys) =>
                                              handleFieldChange(
                                                `storeZones.${zoneIndex}.zoneAisles.${aisleIndex}.aisleRacks.${rackIndex}.rackLevels.${levelIndex}.levelBins.${binIndex}.binType`,
                                                [...keys][0]
                                              )
                                            }
                                          >
                                            <SelectItem key="Normal">
                                              Normal
                                            </SelectItem>
                                            <SelectItem key="Special">
                                              Special
                                            </SelectItem>
                                            <SelectItem key="Hazardous">
                                              Hazardous
                                            </SelectItem>
                                          </Select>
                                        </div>
                                      </div>
                                      <div className="flex flex-col lg:flex-row items-center justify-center w-full h-full p-2 gap-2">
                                        <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                                          <Select
                                            label="Bin Usage"
                                            labelPlacement="outside"
                                            placeholder="Select Bin Usage"
                                            variant="bordered"
                                            color="default"
                                            radius="full"
                                            selectedKeys={[
                                              bin.binUsage || "Storage",
                                            ]}
                                            onSelectionChange={(keys) =>
                                              handleFieldChange(
                                                `storeZones.${zoneIndex}.zoneAisles.${aisleIndex}.aisleRacks.${rackIndex}.rackLevels.${levelIndex}.levelBins.${binIndex}.binUsage`,
                                                [...keys][0]
                                              )
                                            }
                                          >
                                            <SelectItem key="Storage">
                                              Storage
                                            </SelectItem>
                                            <SelectItem key="Picking">
                                              Picking
                                            </SelectItem>
                                            <SelectItem key="Receiving">
                                              Receiving
                                            </SelectItem>
                                            <SelectItem key="Shipping">
                                              Shipping
                                            </SelectItem>
                                          </Select>
                                        </div>
                                        <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                                          <Input
                                            label="Bin Capacity"
                                            labelPlacement="outside"
                                            placeholder="Enter Bin Capacity"
                                            variant="bordered"
                                            color="default"
                                            radius="full"
                                            type="number"
                                            value={bin.binCapacity || 0}
                                            onChange={(e) =>
                                              handleFieldChange(
                                                `storeZones.${zoneIndex}.zoneAisles.${aisleIndex}.aisleRacks.${rackIndex}.rackLevels.${levelIndex}.levelBins.${binIndex}.binCapacity`,
                                                parseInt(e.target.value)
                                              )
                                            }
                                          />
                                        </div>
                                      </div>
                                      <div className="flex flex-col lg:flex-row items-center justify-center w-full h-full p-2 gap-2">
                                        <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                                          <Input
                                            label="RFID Tag ID"
                                            labelPlacement="outside"
                                            placeholder="Enter RFID Tag ID"
                                            variant="bordered"
                                            color="default"
                                            radius="full"
                                            value={bin.binRfidTagId || ""}
                                            onChange={(e) =>
                                              handleFieldChange(
                                                `storeZones.${zoneIndex}.zoneAisles.${aisleIndex}.aisleRacks.${rackIndex}.rackLevels.${levelIndex}.levelBins.${binIndex}.binRfidTagId`,
                                                e.target.value
                                              )
                                            }
                                          />
                                        </div>
                                        <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                                          <Select
                                            label="Bin Status"
                                            labelPlacement="outside"
                                            placeholder="Select Bin Status"
                                            variant="bordered"
                                            color="default"
                                            radius="full"
                                            selectedKeys={[
                                              bin.binStatus || "Empty",
                                            ]}
                                            onSelectionChange={(keys) =>
                                              handleFieldChange(
                                                `storeZones.${zoneIndex}.zoneAisles.${aisleIndex}.aisleRacks.${rackIndex}.rackLevels.${levelIndex}.levelBins.${binIndex}.binStatus`,
                                                [...keys][0]
                                              )
                                            }
                                          >
                                            <SelectItem key="Empty">
                                              Empty
                                            </SelectItem>
                                            <SelectItem key="Partial">
                                              Partial
                                            </SelectItem>
                                            <SelectItem key="Full">
                                              Full
                                            </SelectItem>
                                            <SelectItem key="Reserved">
                                              Reserved
                                            </SelectItem>
                                          </Select>
                                        </div>
                                      </div>
                                      <div className="flex flex-col lg:flex-row items-center justify-center w-full h-full p-2 gap-2">
                                        <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                                          <Input
                                            label="Fill Rate (%)"
                                            labelPlacement="outside"
                                            placeholder="Enter Fill Rate"
                                            variant="bordered"
                                            color="default"
                                            radius="full"
                                            type="number"
                                            min="0"
                                            max="100"
                                            value={bin.binFillRate || 0}
                                            onChange={(e) =>
                                              handleFieldChange(
                                                `storeZones.${zoneIndex}.zoneAisles.${aisleIndex}.aisleRacks.${rackIndex}.rackLevels.${levelIndex}.levelBins.${binIndex}.binFillRate`,
                                                parseInt(e.target.value)
                                              )
                                            }
                                          />
                                        </div>

                                        <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                                          <Input
                                            label="Pos X"
                                            labelPlacement="outside"
                                            placeholder="X Position"
                                            variant="bordered"
                                            color="default"
                                            radius="full"
                                            type="number"
                                            value={bin.binPosX || 0}
                                            onChange={(e) =>
                                              handleFieldChange(
                                                `storeZones.${zoneIndex}.zoneAisles.${aisleIndex}.aisleRacks.${rackIndex}.rackLevels.${levelIndex}.levelBins.${binIndex}.binPosX`,
                                                parseInt(e.target.value)
                                              )
                                            }
                                          />
                                        </div>
                                        <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                                          <Input
                                            label="Pos Y"
                                            labelPlacement="outside"
                                            placeholder="Y Position"
                                            variant="bordered"
                                            color="default"
                                            radius="full"
                                            type="number"
                                            value={bin.binPosY || 0}
                                            onChange={(e) =>
                                              handleFieldChange(
                                                `storeZones.${zoneIndex}.zoneAisles.${aisleIndex}.aisleRacks.${rackIndex}.rackLevels.${levelIndex}.levelBins.${binIndex}.binPosY`,
                                                parseInt(e.target.value)
                                              )
                                            }
                                          />{" "}
                                        </div>
                                        <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                                          <Input
                                            label="Pos Z"
                                            labelPlacement="outside"
                                            placeholder="Z Position"
                                            variant="bordered"
                                            color="default"
                                            radius="full"
                                            type="number"
                                            value={bin.binPosZ || 0}
                                            onChange={(e) =>
                                              handleFieldChange(
                                                `storeZones.${zoneIndex}.zoneAisles.${aisleIndex}.aisleRacks.${rackIndex}.rackLevels.${levelIndex}.levelBins.${binIndex}.binPosZ`,
                                                parseInt(e.target.value)
                                              )
                                            }
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <UITopic Topic={headerContent} />
      <form
        ref={formRef}
        onSubmit={onSubmit}
        className="flex flex-col items-center justify-start w-full h-full p-2 gap-2 overflow-auto"
      >
        <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
          <div className="flex items-center justify-center w-full h-full p-2 gap-2">
            <Input
              name="storeCode"
              label="Store Code"
              labelPlacement="outside"
              placeholder="Please Enter Data"
              variant="bordered"
              color="default"
              radius="full"
              value={formData.storeCode || ""}
              onChange={(e) => handleFieldChange("storeCode", e.target.value)}
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
              color="default"
              radius="full"
              value={formData.storeName || ""}
              onChange={(e) => handleFieldChange("storeName", e.target.value)}
              isInvalid={!!errors.storeName}
              errorMessage={errors.storeName}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
          <div className="flex items-center justify-center w-full h-full p-2 gap-2">
            <Input
              name="storeLocation"
              label="Store Location"
              labelPlacement="outside"
              placeholder="Please Enter Data"
              variant="bordered"
              color="default"
              radius="full"
              value={formData.storeLocation || ""}
              onChange={(e) =>
                handleFieldChange("storeLocation", e.target.value)
              }
              isInvalid={!!errors.storeLocation}
              errorMessage={errors.storeLocation}
            />
          </div>
          <div className="flex items-center justify-center w-full h-full p-2 gap-2">
            <Input
              name="storeDescription"
              label="Store Description"
              labelPlacement="outside"
              placeholder="Please Enter Data"
              variant="bordered"
              color="default"
              radius="full"
              value={formData.storeDescription || ""}
              onChange={(e) =>
                handleFieldChange("storeDescription", e.target.value)
              }
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
                placeholder="Please Select"
                variant="bordered"
                color="default"
                radius="full"
                selectedKeys={
                  formData.storeStatus ? [formData.storeStatus] : []
                }
                onSelectionChange={(keys) =>
                  handleFieldChange("storeStatus", [...keys][0])
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

        <div className="flex flex-row items-center justify-between w-full p-2 gap-2">
          <div className="flex items-center justify-start w-full h-full p-2 gap-2 font-semibold">
            Zones Info
          </div>
          <div className="flex items-center justify-center p-2 gap-2">
            <Button
              type="button"
              color="warning"
              radius="full"
              className="min-w-12 min-h-12 p-2 gap-2 rounded-full"
              onPress={addZone}
            >
              <Plus />
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between w-full gap-2">
          {formData.storeZones?.map((zone, index) =>
            renderZoneSection(zone, index)
          )}
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-end w-full p-2 gap-2">
          <div className="flex items-center justify-center w-full h-full lg:w-6/12 p-2 gap-2">
            <Input
              name="operatedBy"
              type="text"
              label="Operated By"
              labelPlacement="outside"
              placeholder="Please Enter Data"
              variant="flat"
              color="default"
              radius="full"
              isReadOnly
              value={operatedBy}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-end w-full p-2 gap-2">
          <div className="flex items-center justify-center p-2 gap-2">
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
