"use client";

import React from "react";
import UITopic from "@/components/topic/UITopic";
import { Input, Button, Select, SelectItem } from "@heroui/react";

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
  // Helper function to update nested fields
  const updateNestedField = (path, value) => {
    const updated = JSON.parse(JSON.stringify(formData));
    let current = updated;
    
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }
    
    current[path[path.length - 1]] = value;
    setFormData(updated);
  };

  // Helper function to remove nested items
  const removeNestedItem = (path) => {
    const updated = JSON.parse(JSON.stringify(formData));
    let current = updated;
    
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }
    
    current.splice(path[path.length - 1], 1);
    setFormData(updated);
  };

  // Add Zone
  const addZone = () => {
    const updated = [...(formData.storeZones || [])];
    updated.push({
      zoneId: undefined,
      zoneCode: "",
      zoneName: "",
      zoneDescription: "",
      zoneStatus: "Enable",
      zoneAisles: [],
    });
    setFormData({ ...formData, storeZones: updated });
  };

  // Add Aisle to Zone
  const addAisle = (zoneIndex) => {
    const updated = [...formData.storeZones];
    updated[zoneIndex].zoneAisles = [
      ...(updated[zoneIndex].zoneAisles || []),
      {
        aisleId: undefined,
        aisleCode: "",
        aisleName: "",
        aisleDescription: "",
        aisleRacks: [],
      },
    ];
    setFormData({ ...formData, storeZones: updated });
  };

  // Add Rack to Aisle
  const addRack = (zoneIndex, aisleIndex) => {
    const updated = [...formData.storeZones];
    updated[zoneIndex].zoneAisles[aisleIndex].aisleRacks = [
      ...(updated[zoneIndex].zoneAisles[aisleIndex].aisleRacks || []),
      {
        rackId: undefined,
        rackCode: "",
        rackName: "",
        rackDescription: "",
        rackLevels: [],
      },
    ];
    setFormData({ ...formData, storeZones: updated });
  };

  // Add Level to Rack
  const addLevel = (zoneIndex, aisleIndex, rackIndex) => {
    const updated = [...formData.storeZones];
    updated[zoneIndex].zoneAisles[aisleIndex].aisleRacks[rackIndex].rackLevels = [
      ...(updated[zoneIndex].zoneAisles[aisleIndex].aisleRacks[rackIndex].rackLevels || []),
      {
        levelId: undefined,
        levelCode: "",
        levelName: "",
        levelDescription: "",
        levelBins: [],
      },
    ];
    setFormData({ ...formData, storeZones: updated });
  };

  // Add Bin to Level
  const addBin = (zoneIndex, aisleIndex, rackIndex, levelIndex) => {
    const updated = [...formData.storeZones];
    updated[zoneIndex].zoneAisles[aisleIndex].aisleRacks[rackIndex].rackLevels[levelIndex].levelBins = [
      ...(updated[zoneIndex].zoneAisles[aisleIndex].aisleRacks[rackIndex].rackLevels[levelIndex].levelBins || []),
      {
        binId: undefined,
        binCode: "",
        binDescription: "",
        binRow: "",
        binType: "",
        binUsage: "",
        binCapacity: 0,
        binRfidTagId: "",
        binStatus: "Empty",
        binFillRate: 0,
        binPosX: 0,
        binPosY: 0,
        binPosZ: 0,
      },
    ];
    setFormData({ ...formData, storeZones: updated });
  };

  // Render nested error messages
  const renderError = (errorPath) => {
    let errorObj = errors;
    for (const key of errorPath) {
      if (!errorObj || !errorObj[key]) return null;
      errorObj = errorObj[key];
    }
    return typeof errorObj === 'string' ? errorObj : null;
  };

  return (
    <>
      <UITopic Topic={headerContent} />
      <form
        ref={formRef}
        onSubmit={onSubmit}
        className="flex flex-col items-center justify-start w-full h-full p-2 gap-2 border_custom overflow-auto"
      >
        {/* Store fields */}
        <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2 border_custom">
          <div className="flex items-center justify-center w-full h-full p-2 gap-2 border_custom">
            <Input
              name="storeCode"
              label="Store Code"
              labelPlacement="outside"
              placeholder="Please Enter Data"
              variant="bordered"
              color="default"
              radius="full"
              value={formData.storeCode || ""}
              onChange={handleInputChange("storeCode")}
              isInvalid={!!errors.storeCode}
              errorMessage={errors.storeCode}
            />
          </div>
          <div className="flex items-center justify-center w-full h-full p-2 gap-2 border_custom">
            <Input
              name="storeName"
              label="Store Name"
              labelPlacement="outside"
              placeholder="Please Enter Data"
              variant="bordered"
              color="default"
              radius="full"
              value={formData.storeName || ""}
              onChange={handleInputChange("storeName")}
              isInvalid={!!errors.storeName}
              errorMessage={errors.storeName}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2 border_custom">
          <div className="flex items-center justify-center w-full h-full p-2 gap-2 border_custom">
            <Input
              name="storeLocation"
              label="Store Location"
              labelPlacement="outside"
              placeholder="Please Enter Data"
              variant="bordered"
              color="default"
              radius="full"
              value={formData.storeLocation || ""}
              onChange={handleInputChange("storeLocation")}
              isInvalid={!!errors.storeLocation}
              errorMessage={errors.storeLocation}
            />
          </div>
          <div className="flex items-center justify-center w-full h-full p-2 gap-2 border_custom">
            <Input
              name="storeDescription"
              label="Store Description"
              labelPlacement="outside"
              placeholder="Please Enter Data"
              variant="bordered"
              color="default"
              radius="full"
              value={formData.storeDescription || ""}
              onChange={handleInputChange("storeDescription")}
              isInvalid={!!errors.storeDescription}
              errorMessage={errors.storeDescription}
            />
          </div>
        </div>

        {isUpdate && (
          <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2 border_custom">
            <div className="flex items-center justify-center w-full h-full p-2 gap-2 border_custom">
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

        {/* Zones */}
        {formData.storeZones?.map((zone, zoneIndex) => (
          <div key={zoneIndex} className="w-full p-4 border border-gray-200 rounded-lg mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold">Zone {zoneIndex + 1}</h3>
              <Button
                type="button"
                color="danger"
                radius="full"
                size="sm"
                onPress={() => removeNestedItem(["storeZones", zoneIndex])}
              >
                Remove Zone
              </Button>
            </div>

            {/* Zone fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Input
                label="Zone Code"
                value={zone.zoneCode}
                onChange={(e) => updateNestedField(["storeZones", zoneIndex, "zoneCode"], e.target.value)}
                isInvalid={!!renderError(["storeZones", zoneIndex, "zoneCode"])}
                errorMessage={renderError(["storeZones", zoneIndex, "zoneCode"])}
              />
              <Input
                label="Zone Name"
                value={zone.zoneName}
                onChange={(e) => updateNestedField(["storeZones", zoneIndex, "zoneName"], e.target.value)}
                isInvalid={!!renderError(["storeZones", zoneIndex, "zoneName"])}
                errorMessage={renderError(["storeZones", zoneIndex, "zoneName"])}
              />
              <Input
                label="Zone Description"
                value={zone.zoneDescription}
                onChange={(e) => updateNestedField(["storeZones", zoneIndex, "zoneDescription"], e.target.value)}
              />
              <Select
                label="Zone Status"
                selectedKeys={[zone.zoneStatus]}
                onSelectionChange={(keys) => 
                  updateNestedField(["storeZones", zoneIndex, "zoneStatus"], [...keys][0])
                }
              >
                <SelectItem key="Enable">Enable</SelectItem>
                <SelectItem key="Disable">Disable</SelectItem>
              </Select>
            </div>

            {/* Aisles */}
            <div className="ml-4">
              {zone.zoneAisles?.map((aisle, aisleIndex) => (
                <div key={aisleIndex} className="mt-4 p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold">Aisle {aisleIndex + 1}</h4>
                    <Button
                      type="button"
                      color="danger"
                      radius="full"
                      size="sm"
                      onPress={() => removeNestedItem(["storeZones", zoneIndex, "zoneAisles", aisleIndex])}
                    >
                      Remove Aisle
                    </Button>
                  </div>

                  {/* Aisle fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <Input
                      label="Aisle Code"
                      value={aisle.aisleCode}
                      onChange={(e) => updateNestedField(["storeZones", zoneIndex, "zoneAisles", aisleIndex, "aisleCode"], e.target.value)}
                      isInvalid={!!renderError(["storeZones", zoneIndex, "zoneAisles", aisleIndex, "aisleCode"])}
                      errorMessage={renderError(["storeZones", zoneIndex, "zoneAisles", aisleIndex, "aisleCode"])}
                    />
                    <Input
                      label="Aisle Name"
                      value={aisle.aisleName}
                      onChange={(e) => updateNestedField(["storeZones", zoneIndex, "zoneAisles", aisleIndex, "aisleName"], e.target.value)}
                      isInvalid={!!renderError(["storeZones", zoneIndex, "zoneAisles", aisleIndex, "aisleName"])}
                      errorMessage={renderError(["storeZones", zoneIndex, "zoneAisles", aisleIndex, "aisleName"])}
                    />
                    <Input
                      label="Aisle Description"
                      value={aisle.aisleDescription}
                      onChange={(e) => updateNestedField(["storeZones", zoneIndex, "zoneAisles", aisleIndex, "aisleDescription"], e.target.value)}
                    />
                  </div>

                  {/* Racks */}
                  <div className="ml-4">
                    {aisle.aisleRacks?.map((rack, rackIndex) => (
                      <div key={rackIndex} className="mt-4 p-4 border border-gray-200 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h5 className="font-bold">Rack {rackIndex + 1}</h5>
                          <Button
                            type="button"
                            color="danger"
                            radius="full"
                            size="sm"
                            onPress={() => removeNestedItem(["storeZones", zoneIndex, "zoneAisles", aisleIndex, "aisleRacks", rackIndex])}
                          >
                            Remove Rack
                          </Button>
                        </div>

                        {/* Rack fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <Input
                            label="Rack Code"
                            value={rack.rackCode}
                            onChange={(e) => updateNestedField(["storeZones", zoneIndex, "zoneAisles", aisleIndex, "aisleRacks", rackIndex, "rackCode"], e.target.value)}
                            isInvalid={!!renderError(["storeZones", zoneIndex, "zoneAisles", aisleIndex, "aisleRacks", rackIndex, "rackCode"])}
                            errorMessage={renderError(["storeZones", zoneIndex, "zoneAisles", aisleIndex, "aisleRacks", rackIndex, "rackCode"])}
                          />
                          <Input
                            label="Rack Name"
                            value={rack.rackName}
                            onChange={(e) => updateNestedField(["storeZones", zoneIndex, "zoneAisles", aisleIndex, "aisleRacks", rackIndex, "rackName"], e.target.value)}
                            isInvalid={!!renderError(["storeZones", zoneIndex, "zoneAisles", aisleIndex, "aisleRacks", rackIndex, "rackName"])}
                            errorMessage={renderError(["storeZones", zoneIndex, "zoneAisles", aisleIndex, "aisleRacks", rackIndex, "rackName"])}
                          />
                          <Input
                            label="Rack Description"
                            value={rack.rackDescription}
                            onChange={(e) => updateNestedField(["storeZones", zoneIndex, "zoneAisles", aisleIndex, "aisleRacks", rackIndex, "rackDescription"], e.target.value)}
                          />
                        </div>

                        {/* Levels */}
                        <div className="ml-4">
                          {rack.rackLevels?.map((level, levelIndex) => (
                            <div key={levelIndex} className="mt-4 p-4 border border-gray-200 rounded-lg">
                              <div className="flex justify-between items-center mb-2">
                                <h6 className="font-bold">Level {levelIndex + 1}</h6>
                                <Button
                                  type="button"
                                  color="danger"
                                  radius="full"
                                  size="sm"
                                  onPress={() => removeNestedItem(["storeZones", zoneIndex, "zoneAisles", aisleIndex, "aisleRacks", rackIndex, "rackLevels", levelIndex])}
                                >
                                  Remove Level
                                </Button>
                              </div>

                              {/* Level fields */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <Input
                                  label="Level Code"
                                  value={level.levelCode}
                                  onChange={(e) => updateNestedField(["storeZones", zoneIndex, "zoneAisles", aisleIndex, "aisleRacks", rackIndex, "rackLevels", levelIndex, "levelCode"], e.target.value)}
                                  isInvalid={!!renderError(["storeZones", zoneIndex, "zoneAisles", aisleIndex, "aisleRacks", rackIndex, "rackLevels", levelIndex, "levelCode"])}
                                  errorMessage={renderError(["storeZones", zoneIndex, "zoneAisles", aisleIndex, "aisleRacks", rackIndex, "rackLevels", levelIndex, "levelCode"])}
                                />
                                <Input
                                  label="Level Name"
                                  value={level.levelName}
                                  onChange={(e) => updateNestedField(["storeZones", zoneIndex, "zoneAisles", aisleIndex, "aisleRacks", rackIndex, "rackLevels", levelIndex, "levelName"], e.target.value)}
                                  isInvalid={!!renderError(["storeZones", zoneIndex, "zoneAisles", aisleIndex, "aisleRacks", rackIndex, "rackLevels", levelIndex, "levelName"])}
                                  errorMessage={renderError(["storeZones", zoneIndex, "zoneAisles", aisleIndex, "aisleRacks", rackIndex, "rackLevels", levelIndex, "levelName"])}
                                />
                                <Input
                                  label="Level Description"
                                  value={level.levelDescription}
                                  onChange={(e) => updateNestedField(["storeZones", zoneIndex, "zoneAisles", aisleIndex, "aisleRacks", rackIndex, "rackLevels", levelIndex, "levelDescription"], e.target.value)}
                                />
                              </div>

                              {/* Bins */}
                              <div className="ml-4">
                                {level.levelBins?.map((bin, binIndex) => (
                                  <div key={binIndex} className="mt-4 p-4 border border-gray-200 rounded-lg">
                                    <div className="flex justify-between items-center mb-2">
                                      <h6 className="font-bold">Bin {binIndex + 1}</h6>
                                      <Button
                                        type="button"
                                        color="danger"
                                        radius="full"
                                        size="sm"
                                        onPress={() => removeNestedItem(["storeZones", zoneIndex, "zoneAisles", aisleIndex, "aisleRacks", rackIndex, "rackLevels", levelIndex, "levelBins", binIndex])}
                                      >
                                        Remove Bin
                                      </Button>
                                    </div>

                                    {/* Bin fields */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <Input
                                        label="Bin Code"
                                        value={bin.binCode}
                                        onChange={(e) => updateNestedField(["storeZones", zoneIndex, "zoneAisles", aisleIndex, "aisleRacks", rackIndex, "rackLevels", levelIndex, "levelBins", binIndex, "binCode"], e.target.value)}
                                        isInvalid={!!renderError(["storeZones", zoneIndex, "zoneAisles", aisleIndex, "aisleRacks", rackIndex, "rackLevels", levelIndex, "levelBins", binIndex, "binCode"])}
                                        errorMessage={renderError(["storeZones", zoneIndex, "zoneAisles", aisleIndex, "aisleRacks", rackIndex, "rackLevels", levelIndex, "levelBins", binIndex, "binCode"])}
                                      />
                                      <Input
                                        label="Bin Row"
                                        value={bin.binRow}
                                        onChange={(e) => updateNestedField(["storeZones", zoneIndex, "zoneAisles", aisleIndex, "aisleRacks", rackIndex, "rackLevels", levelIndex, "levelBins", binIndex, "binRow"], e.target.value)}
                                        isInvalid={!!renderError(["storeZones", zoneIndex, "zoneAisles", aisleIndex, "aisleRacks", rackIndex, "rackLevels", levelIndex, "levelBins", binIndex, "binRow"])}
                                        errorMessage={renderError(["storeZones", zoneIndex, "zoneAisles", aisleIndex, "aisleRacks", rackIndex, "rackLevels", levelIndex, "levelBins", binIndex, "binRow"])}
                                      />
                                      <Input
                                        label="Bin Type"
                                        value={bin.binType}
                                        onChange={(e) => updateNestedField(["storeZones", zoneIndex, "zoneAisles", aisleIndex, "aisleRacks", rackIndex, "rackLevels", levelIndex, "levelBins", binIndex, "binType"], e.target.value)}
                                        isInvalid={!!renderError(["storeZones", zoneIndex, "zoneAisles", aisleIndex, "aisleRacks", rackIndex, "rackLevels", levelIndex, "levelBins", binIndex, "binType"])}
                                        errorMessage={renderError(["storeZones", zoneIndex, "zoneAisles", aisleIndex, "aisleRacks", rackIndex, "rackLevels", levelIndex, "levelBins", binIndex, "binType"])}
                                      />
                                      <Input
                                        label="Bin Usage"
                                        value={bin.binUsage}
                                        onChange={(e) => updateNestedField(["storeZones", zoneIndex, "zoneAisles", aisleIndex, "aisleRacks", rackIndex, "rackLevels", levelIndex, "levelBins", binIndex, "binUsage"], e.target.value)}
                                        isInvalid={!!renderError(["storeZones", zoneIndex, "zoneAisles", aisleIndex, "aisleRacks", rackIndex, "rackLevels", levelIndex, "levelBins", binIndex, "binUsage"])}
                                        errorMessage={renderError(["storeZones", zoneIndex, "zoneAisles", aisleIndex, "aisleRacks", rackIndex, "rackLevels", levelIndex, "levelBins", binIndex, "binUsage"])}
                                      />
                                      <Input
                                        label="Bin Capacity"
                                        type="number"
                                        value={bin.binCapacity}
                                        onChange={(e) => updateNestedField(["storeZones", zoneIndex, "zoneAisles", aisleIndex, "aisleRacks", rackIndex, "rackLevels", levelIndex, "levelBins", binIndex, "binCapacity"], parseInt(e.target.value))}
                                        isInvalid={!!renderError(["storeZones", zoneIndex, "zoneAisles", aisleIndex, "aisleRacks", rackIndex, "rackLevels", levelIndex, "levelBins", binIndex, "binCapacity"])}
                                        errorMessage={renderError(["storeZones", zoneIndex, "zoneAisles", aisleIndex, "aisleRacks", rackIndex, "rackLevels", levelIndex, "levelBins", binIndex, "binCapacity"])}
                                      />
                                      <Input
                                        label="Bin RFID Tag"
                                        value={bin.binRfidTagId}
                                        onChange={(e) => updateNestedField(["storeZones", zoneIndex, "zoneAisles", aisleIndex, "aisleRacks", rackIndex, "rackLevels", levelIndex, "levelBins", binIndex, "binRfidTagId"], e.target.value)}
                                      />
                                      <Select
                                        label="Bin Status"
                                        selectedKeys={[bin.binStatus]}
                                        onSelectionChange={(keys) => 
                                          updateNestedField(["storeZones", zoneIndex, "zoneAisles", aisleIndex, "aisleRacks", rackIndex, "rackLevels", levelIndex, "levelBins", binIndex, "binStatus"], [...keys][0])
                                        }
                                      >
                                        <SelectItem key="Empty">Empty</SelectItem>
                                        <SelectItem key="Partial">Partial</SelectItem>
                                        <SelectItem key="Full">Full</SelectItem>
                                        <SelectItem key="Reserved">Reserved</SelectItem>
                                      </Select>
                                      <Input
                                        label="Bin Fill Rate"
                                        type="number"
                                        step="0.01"
                                        value={bin.binFillRate}
                                        onChange={(e) => updateNestedField(["storeZones", zoneIndex, "zoneAisles", aisleIndex, "aisleRacks", rackIndex, "rackLevels", levelIndex, "levelBins", binIndex, "binFillRate"], parseFloat(e.target.value))}
                                      />
                                      <Input
                                        label="Bin Position X"
                                        type="number"
                                        step="0.01"
                                        value={bin.binPosX}
                                        onChange={(e) => updateNestedField(["storeZones", zoneIndex, "zoneAisles", aisleIndex, "aisleRacks", rackIndex, "rackLevels", levelIndex, "levelBins", binIndex, "binPosX"], parseFloat(e.target.value))}
                                      />
                                      <Input
                                        label="Bin Position Y"
                                        type="number"
                                        step="0.01"
                                        value={bin.binPosY}
                                        onChange={(e) => updateNestedField(["storeZones", zoneIndex, "zoneAisles", aisleIndex, "aisleRacks", rackIndex, "rackLevels", levelIndex, "levelBins", binIndex, "binPosY"], parseFloat(e.target.value))}
                                      />
                                      <Input
                                        label="Bin Position Z"
                                        type="number"
                                        step="0.01"
                                        value={bin.binPosZ}
                                        onChange={(e) => updateNestedField(["storeZones", zoneIndex, "zoneAisles", aisleIndex, "aisleRacks", rackIndex, "rackLevels", levelIndex, "levelBins", binIndex, "binPosZ"], parseFloat(e.target.value))}
                                      />
                                    </div>
                                  </div>
                                ))}
                                <Button
                                  type="button"
                                  color="secondary"
                                  radius="full"
                                  size="sm"
                                  className="mt-2"
                                  onPress={() => addBin(zoneIndex, aisleIndex, rackIndex, levelIndex)}
                                >
                                  Add Bin
                                </Button>
                              </div>
                            </div>
                          ))}
                          <Button
                            type="button"
                            color="secondary"
                            radius="full"
                            size="sm"
                            className="mt-2"
                            onPress={() => addLevel(zoneIndex, aisleIndex, rackIndex)}
                          >
                            Add Level
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button
                      type="button"
                      color="secondary"
                      radius="full"
                      size="sm"
                      className="mt-2"
                      onPress={() => addRack(zoneIndex, aisleIndex)}
                    >
                      Add Rack
                    </Button>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                color="secondary"
                radius="full"
                size="sm"
                className="mt-2"
                onPress={() => addAisle(zoneIndex)}
              >
                Add Aisle
              </Button>
            </div>
          </div>
        ))}

        {/* Add Zone button */}
        <Button
          type="button"
          color="secondary"
          radius="full"
          onPress={addZone}
        >
          Add Zone
        </Button>

        {/* Operated By */}
        <div className="flex flex-col lg:flex-row items-center justify-end w-full p-2 gap-2 border_custom">
          <div className="flex items-center justify-center w-full h-full lg:w-6/12 p-2 gap-2 border_custom">
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

        {/* Submit button */}
        <div className="flex flex-col lg:flex-row items-center justify-end w-full p-2 gap-2 border_custom">
          <div className="flex items-center justify-center h-full p-2 gap-2 border_custom">
            <Button
              type="submit"
              color="primary"
              radius="full"
              className="w-full h-full p-3 gap-2 border_custom"
            >
              Save
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}