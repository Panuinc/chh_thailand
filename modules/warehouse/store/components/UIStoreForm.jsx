"use client";

import React from "react";
import UITopic from "@/components/topic/UITopic";
import { Input, Button, Select, SelectItem, Textarea } from "@heroui/react";

export default function UIStoreForm({
  headerContent,
  formRef,
  onSubmit,
  errors,
  formData,
  setFormData,
  handleInputChange,
  handleNestedChange,
  isUpdate,
  operatedBy,
}) {
  const addNested = (path, newItem) => {
    setFormData((prev) => {
      const newData = structuredClone(prev);
      let target = newData;
      for (const key of path) {
        if (!target[key]) target[key] = [];
        target = target[key];
      }
      target.push(newItem);
      return newData;
    });
  };

  const deleteNested = (path, index) => {
    setFormData((prev) => {
      const newData = structuredClone(prev);
      let target = newData;
      for (const key of path) {
        if (!target[key]) return prev;
        target = target[key];
      }
      target.splice(index, 1);
      return newData;
    });
  };

  return (
    <>
      <UITopic Topic={headerContent} />
      <form
        ref={formRef}
        onSubmit={(e) => onSubmit(e, formData)}
        className="flex flex-col items-center justify-start w-full h-full p-2 gap-2 overflow-auto"
      >
        <div className="flex flex-col items-center justify-center w-full p-2 gap-2">
          <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
            <div className="flex items-center justify-start w-full h-full p-2 gap-2 font-semibold">
              Store Information
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
                color="default"
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
                color="default"
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
              <Textarea
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
            <div className="flex flex-col lg:flex-row items-center justify-end w-full p-2 gap-2">
              <div className="flex items-center justify-center w-full h-full lg:w-6/12 p-2 gap-2">
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

          <div className="flex flex-col lg:flex-row items-end justify-end w-full p-2 gap-2">
            <div className="flex items-center justify-center h-full p-2 gap-2">
              <Button
                onPress={() =>
                  addNested(["storeZones"], {
                    zoneCode: "",
                    zoneName: "",
                    zoneDescription: "",
                    zonePosX: "",
                    zonePosY: "",
                    zoneStatus: "",
                    zoneAisles: [],
                  })
                }
                color="warning"
                radius="full"
                className="w-full h-full p-3 gap-2"
              >
                + Zone
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 items-start justify-start p-2 gap-2 w-full">
          {(formData.storeZones || []).map((zone, z) => (
            <div
              key={z}
              className="flex flex-col items-center justify-start w-full p-2 gap-2 border-2 border-default rounded-3xl"
            >
              <div className="flex flex-row items-center justify-center w-full p-2 gap-2">
                <div className="flex items-center justify-start w-full h-full p-2 gap-2 font-semibold">
                  Zone Information : {zone.zoneCode || `#${z + 1}`}
                </div>
                <div className="flex items-center justify-center h-full p-2 gap-2">
                  <Button
                    onPress={() => deleteNested(["storeZones"], z)}
                    color="danger"
                    radius="full"
                    className="w-full h-full p-3 gap-2"
                  >
                    🗑
                  </Button>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
                <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                  <Input
                    name={`zoneCode-${z}`}
                    label="Zone Code"
                    labelPlacement="outside"
                    placeholder="Please Enter Data"
                    variant="bordered"
                    color="default"
                    radius="full"
                    value={zone.zoneCode || ""}
                    onChange={handleNestedChange(["storeZones", z], "zoneCode")}
                    isInvalid={!!errors.zoneCode}
                    errorMessage={errors.zoneCode}
                  />
                </div>
                <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                  <Input
                    name={`zoneName-${z}`}
                    label="Zone Name"
                    labelPlacement="outside"
                    placeholder="Please Enter Data"
                    variant="bordered"
                    color="default"
                    radius="full"
                    value={zone.zoneName || ""}
                    onChange={handleNestedChange(["storeZones", z], "zoneName")}
                    isInvalid={!!errors.zoneName}
                    errorMessage={errors.zoneName}
                  />
                </div>
              </div>

              <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
                <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                  <Textarea
                    name={`zoneDescription-${z}`}
                    label="Zone Description"
                    labelPlacement="outside"
                    placeholder="Please Enter Data"
                    variant="bordered"
                    color="default"
                    radius="full"
                    value={zone.zoneDescription || ""}
                    onChange={handleNestedChange(
                      ["storeZones", z],
                      "zoneDescription"
                    )}
                    isInvalid={!!errors.zoneDescription}
                    errorMessage={errors.zoneDescription}
                  />
                </div>
              </div>

              <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
                <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                  <Input
                    type="number"
                    name={`zonePosX-${z}`}
                    label="Zone PosX"
                    labelPlacement="outside"
                    placeholder="Please Enter Data"
                    variant="bordered"
                    color="default"
                    radius="full"
                    value={zone.zonePosX || ""}
                    onChange={handleNestedChange(["storeZones", z], "zonePosX")}
                    isInvalid={!!errors.zonePosX}
                    errorMessage={errors.zonePosX}
                  />
                </div>
                <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                  <Input
                    type="number"
                    name={`zonePosY-${z}`}
                    label="Zone PosY"
                    labelPlacement="outside"
                    placeholder="Please Enter Data"
                    variant="bordered"
                    color="default"
                    radius="full"
                    value={zone.zonePosY || ""}
                    onChange={handleNestedChange(["storeZones", z], "zonePosY")}
                    isInvalid={!!errors.zonePosY}
                    errorMessage={errors.zonePosY}
                  />
                </div>
              </div>

              <div className="flex flex-col lg:flex-row items-center justify-end w-full p-2 gap-2">
                <div className="flex items-center justify-center w-full h-full lg:w-6/12 p-2 gap-2">
                  <Select
                    name={`zoneStatus-${z}`}
                    label="Zone Status"
                    labelPlacement="outside"
                    placeholder="Please Select"
                    variant="bordered"
                    color="default"
                    radius="full"
                    selectedKeys={zone.zoneStatus ? [zone.zoneStatus] : []}
                    onSelectionChange={(keys) =>
                      handleNestedChange(
                        ["storeZones", z],
                        "zoneStatus"
                      )([...keys][0])
                    }
                    isInvalid={!!errors.zoneStatus}
                    errorMessage={errors.zoneStatus}
                  >
                    <SelectItem key="Enable">Enable</SelectItem>
                    <SelectItem key="Disable">Disable</SelectItem>
                  </Select>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row items-end justify-end w-full p-2 gap-2">
                <div className="flex items-center justify-center h-full p-2 gap-2">
                  <Button
                    onPress={() =>
                      addNested(["storeZones", z, "zoneAisles"], {
                        aisleCode: "",
                        aisleName: "",
                        aisleDescription: "",
                        aislePosX: "",
                        aislePosY: "",
                        aisleStatus: "",
                        aisleRacks: [],
                      })
                    }
                    color="warning"
                    radius="full"
                    className="w-full h-full p-3 gap-2"
                  >
                    + Aisle
                  </Button>
                </div>
              </div>

              {zone.zoneAisles?.map((aisle, a) => (
                <div
                  key={a}
                  className="flex flex-col items-center justify-start w-full h-full gap-2"
                >
                  <div className="flex flex-row items-center justify-center w-full p-2 gap-2">
                    <div className="flex items-center justify-start w-full h-full p-2 gap-2 font-semibold">
                      Aisle Information : {aisle.aisleCode}
                    </div>
                    <div className="flex items-center justify-center h-full p-2 gap-2">
                      <Button
                        onPress={() =>
                          deleteNested(["storeZones", z, "zoneAisles"], a)
                        }
                        color="danger"
                        radius="full"
                        className="w-full h-full p-3 gap-2"
                      >
                        🗑
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
                    <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                      <Input
                        name={`aisleCode-${z}-${a}`}
                        label="Aisle Code"
                        labelPlacement="outside"
                        placeholder="Please Enter Data"
                        variant="bordered"
                        color="default"
                        radius="full"
                        value={aisle.aisleCode}
                        onChange={handleNestedChange(
                          ["storeZones", z, "zoneAisles", a],
                          "aisleCode"
                        )}
                        isInvalid={!!errors.aisleCode}
                        errorMessage={errors.aisleCode}
                      />
                    </div>
                    <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                      <Input
                        name={`aisleName-${z}-${a}`}
                        label="Aisle Name"
                        labelPlacement="outside"
                        placeholder="Please Enter Data"
                        variant="bordered"
                        color="default"
                        radius="full"
                        value={aisle.aisleName || ""}
                        onChange={handleNestedChange(
                          ["storeZones", z, "zoneAisles", a],
                          "aisleName"
                        )}
                        isInvalid={!!errors.aisleName}
                        errorMessage={errors.aisleName}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
                    <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                      <Textarea
                        name={`aisleDescription-${z}-${a}`}
                        label="Aisle Description"
                        labelPlacement="outside"
                        placeholder="Please Enter Data"
                        variant="bordered"
                        color="default"
                        radius="full"
                        value={aisle.aisleDescription || ""}
                        onChange={handleNestedChange(
                          ["storeZones", z, "zoneAisles", a],
                          "aisleDescription"
                        )}
                        isInvalid={!!errors.aisleDescription}
                        errorMessage={errors.aisleDescription}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
                    <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                      <Input
                        type="number"
                        name={`aislePosX-${z}-${a}`}
                        label="Aisle PosX"
                        labelPlacement="outside"
                        placeholder="Please Enter Data"
                        variant="bordered"
                        color="default"
                        radius="full"
                        value={aisle.aislePosX || ""}
                        onChange={handleNestedChange(
                          ["storeZones", z, "zoneAisles", a],
                          "aislePosX"
                        )}
                        isInvalid={!!errors.aislePosX}
                        errorMessage={errors.aislePosX}
                      />
                    </div>
                    <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                      <Input
                        type="number"
                        name={`aislePosY-${z}-${a}`}
                        label="Aisle PosY"
                        labelPlacement="outside"
                        placeholder="Please Enter Data"
                        variant="bordered"
                        color="default"
                        radius="full"
                        value={aisle.aislePosY || ""}
                        onChange={handleNestedChange(
                          ["storeZones", z, "zoneAisles", a],
                          "aislePosY"
                        )}
                        isInvalid={!!errors.aislePosY}
                        errorMessage={errors.aislePosY}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row items-center justify-end w-full p-2 gap-2">
                    <div className="flex items-center justify-center w-full h-full lg:w-6/12 p-2 gap-2">
                      <Select
                        name={`aisleStatus-${z}-${a}`}
                        label="Aisle Status"
                        labelPlacement="outside"
                        placeholder="Please Select"
                        variant="bordered"
                        color="default"
                        radius="full"
                        selectedKeys={
                          aisle.aisleStatus ? [aisle.aisleStatus] : []
                        }
                        onSelectionChange={(keys) =>
                          handleNestedChange(
                            ["storeZones", z, "zoneAisles", a],
                            "aisleStatus"
                          )([...keys][0])
                        }
                        isInvalid={!!errors.aisleStatus}
                        errorMessage={errors.aisleStatus}
                      >
                        <SelectItem key="Enable">Enable</SelectItem>
                        <SelectItem key="Disable">Disable</SelectItem>
                      </Select>
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row items-end justify-end w-full p-2 gap-2">
                    <div className="flex items-center justify-center h-full p-2 gap-2">
                      <Button
                        onPress={() =>
                          addNested(
                            ["storeZones", z, "zoneAisles", a, "aisleRacks"],
                            {
                              rackCode: "",
                              rackName: "",
                              rackDescription: "",
                              rackPosX: "",
                              rackPosY: "",
                              rackStatus: "",
                              rackLevels: [],
                            }
                          )
                        }
                        color="warning"
                        radius="full"
                        className="w-full h-full p-3 gap-2"
                      >
                        + Rack
                      </Button>
                    </div>
                  </div>

                  {(aisle.aisleRacks || []).map((rack, r) => (
                    <div
                      key={r}
                      className="flex flex-col items-center justify-start w-full h-full gap-2"
                    >
                      <div className="flex flex-row items-center justify-center w-full p-2 gap-2">
                        <div className="flex items-center justify-start w-full h-full p-2 gap-2 font-semibold">
                          Rack Information : {rack.rackCode || `#${r + 1}`}
                        </div>
                        <div className="flex items-center justify-center h-full p-2 gap-2">
                          <Button
                            onPress={() =>
                              deleteNested(
                                [
                                  "storeZones",
                                  z,
                                  "zoneAisles",
                                  a,
                                  "aisleRacks",
                                ],
                                r
                              )
                            }
                            color="danger"
                            radius="full"
                            className="w-full h-full p-3 gap-2"
                          >
                            🗑
                          </Button>
                        </div>
                      </div>

                      <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
                        <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                          <Input
                            name={`rackCode-${z}-${a}-${r}`}
                            label="Rack Code"
                            labelPlacement="outside"
                            placeholder="Please Enter Data"
                            variant="bordered"
                            color="default"
                            radius="full"
                            value={rack.rackCode || ""}
                            onChange={handleNestedChange(
                              [
                                "storeZones",
                                z,
                                "zoneAisles",
                                a,
                                "aisleRacks",
                                r,
                              ],
                              "rackCode"
                            )}
                            isInvalid={!!errors.rackCode}
                            errorMessage={errors.rackCode}
                          />
                        </div>
                        <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                          <Input
                            name={`rackName-${z}-${a}-${r}`}
                            label="Rack Name"
                            labelPlacement="outside"
                            placeholder="Please Enter Data"
                            variant="bordered"
                            color="default"
                            radius="full"
                            value={rack.rackName || ""}
                            onChange={handleNestedChange(
                              [
                                "storeZones",
                                z,
                                "zoneAisles",
                                a,
                                "aisleRacks",
                                r,
                              ],
                              "rackName"
                            )}
                            isInvalid={!!errors.rackName}
                            errorMessage={errors.rackName}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
                        <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                          <Textarea
                            name={`rackDescription-${z}-${a}-${r}`}
                            label="Rack Description"
                            labelPlacement="outside"
                            placeholder="Please Enter Data"
                            variant="bordered"
                            color="default"
                            radius="full"
                            value={rack.rackDescription || ""}
                            onChange={handleNestedChange(
                              [
                                "storeZones",
                                z,
                                "zoneAisles",
                                a,
                                "aisleRacks",
                                r,
                              ],
                              "rackDescription"
                            )}
                            isInvalid={!!errors.rackDescription}
                            errorMessage={errors.rackDescription}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
                        <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                          <Input
                            type="number"
                            name={`rackPosX-${z}-${a}-${r}`}
                            label="Rack PosX"
                            labelPlacement="outside"
                            placeholder="Please Enter Data"
                            variant="bordered"
                            color="default"
                            radius="full"
                            value={rack.rackPosX || ""}
                            onChange={handleNestedChange(
                              [
                                "storeZones",
                                z,
                                "zoneAisles",
                                a,
                                "aisleRacks",
                                r,
                              ],
                              "rackPosX"
                            )}
                            isInvalid={!!errors.rackPosX}
                            errorMessage={errors.rackPosX}
                          />
                        </div>
                        <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                          <Input
                            type="number"
                            name={`rackPosY-${z}-${a}-${r}`}
                            label="Rack PosY"
                            labelPlacement="outside"
                            placeholder="Please Enter Data"
                            variant="bordered"
                            color="default"
                            radius="full"
                            value={rack.rackPosY || ""}
                            onChange={handleNestedChange(
                              [
                                "storeZones",
                                z,
                                "zoneAisles",
                                a,
                                "aisleRacks",
                                r,
                              ],
                              "rackPosY"
                            )}
                            isInvalid={!!errors.rackPosY}
                            errorMessage={errors.rackPosY}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col lg:flex-row items-center justify-end w-full p-2 gap-2">
                        <div className="flex items-center justify-center w-full h-full lg:w-6/12 p-2 gap-2">
                          <Select
                            name={`rackStatus-${z}-${a}-${r}`}
                            label="Rack Status"
                            labelPlacement="outside"
                            placeholder="Please Select"
                            variant="bordered"
                            color="default"
                            radius="full"
                            selectedKeys={
                              rack.rackStatus ? [rack.rackStatus] : []
                            }
                            onSelectionChange={(keys) =>
                              handleNestedChange(
                                [
                                  "storeZones",
                                  z,
                                  "zoneAisles",
                                  a,
                                  "aisleRacks",
                                  r,
                                ],
                                "rackStatus"
                              )([...keys][0])
                            }
                            isInvalid={!!errors.rackStatus}
                            errorMessage={errors.rackStatus}
                          >
                            <SelectItem key="Enable">Enable</SelectItem>
                            <SelectItem key="Disable">Disable</SelectItem>
                          </Select>
                        </div>
                      </div>

                      <div className="flex flex-col lg:flex-row items-end justify-end w-full p-2 gap-2">
                        <div className="flex items-center justify-center h-full p-2 gap-2">
                          <Button
                            onPress={() =>
                              addNested(
                                [
                                  "storeZones",
                                  z,
                                  "zoneAisles",
                                  a,
                                  "aisleRacks",
                                  r,
                                  "rackLevels",
                                ],
                                {
                                  levelCode: "",
                                  levelName: "",
                                  levelDescription: "",
                                  levelStatus: "",
                                  levelBins: [],
                                }
                              )
                            }
                            color="warning"
                            radius="full"
                            className="w-full h-full p-3 gap-2"
                          >
                            + Level
                          </Button>
                        </div>
                      </div>

                      {(rack.rackLevels || []).map((lv, i) => (
                        <div
                          key={i}
                          className="flex flex-col items-center justify-start w-full h-full gap-2"
                        >
                          <div className="flex flex-row items-center justify-center w-full p-2 gap-2">
                            <div className="flex items-center justify-start w-full h-full p-2 gap-2 font-semibold">
                              Level Information : {lv.levelCode || `#${i + 1}`}
                            </div>
                            <div className="flex items-center justify-center h-full p-2 gap-2">
                              <Button
                                onPress={() =>
                                  deleteNested(
                                    [
                                      "storeZones",
                                      z,
                                      "zoneAisles",
                                      a,
                                      "aisleRacks",
                                      r,
                                      "rackLevels",
                                    ],
                                    i
                                  )
                                }
                                color="danger"
                                radius="full"
                                className="w-full h-full p-3 gap-2"
                              >
                                🗑
                              </Button>
                            </div>
                          </div>

                          <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
                            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                              <Input
                                name={`levelCode-${z}-${a}-${r}-${i}`}
                                label="Level Code"
                                labelPlacement="outside"
                                placeholder="Please Enter Data"
                                variant="bordered"
                                color="default"
                                radius="full"
                                value={lv.levelCode || ""}
                                onChange={handleNestedChange(
                                  [
                                    "storeZones",
                                    z,
                                    "zoneAisles",
                                    a,
                                    "aisleRacks",
                                    r,
                                    "rackLevels",
                                    i,
                                  ],
                                  "levelCode"
                                )}
                                isInvalid={!!errors.levelCode}
                                errorMessage={errors.levelCode}
                              />
                            </div>
                            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                              <Input
                                name={`levelName-${z}-${a}-${r}-${i}`}
                                label="Level Name"
                                labelPlacement="outside"
                                placeholder="Please Enter Data"
                                variant="bordered"
                                color="default"
                                radius="full"
                                value={lv.levelName || ""}
                                onChange={handleNestedChange(
                                  [
                                    "storeZones",
                                    z,
                                    "zoneAisles",
                                    a,
                                    "aisleRacks",
                                    r,
                                    "rackLevels",
                                    i,
                                  ],
                                  "levelName"
                                )}
                                isInvalid={!!errors.levelName}
                                errorMessage={errors.levelName}
                              />
                            </div>
                          </div>

                          <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
                            <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                              <Textarea
                                name={`levelDescription-${z}-${a}-${r}-${i}`}
                                label="Level Description"
                                labelPlacement="outside"
                                placeholder="Please Enter Data"
                                variant="bordered"
                                color="default"
                                radius="full"
                                value={lv.levelDescription || ""}
                                onChange={handleNestedChange(
                                  [
                                    "storeZones",
                                    z,
                                    "zoneAisles",
                                    a,
                                    "aisleRacks",
                                    r,
                                    "rackLevels",
                                    i,
                                  ],
                                  "levelDescription"
                                )}
                                isInvalid={!!errors.levelDescription}
                                errorMessage={errors.levelDescription}
                              />
                            </div>
                          </div>

                          <div className="flex flex-col lg:flex-row items-center justify-end w-full p-2 gap-2">
                            <div className="flex items-center justify-center w-full h-full lg:w-6/12 p-2 gap-2">
                              <Select
                                name={`levelStatus-${z}-${a}-${r}-${i}`}
                                label="Level Status"
                                labelPlacement="outside"
                                placeholder="Please Select"
                                variant="bordered"
                                color="default"
                                radius="full"
                                selectedKeys={
                                  lv.levelStatus ? [lv.levelStatus] : []
                                }
                                onSelectionChange={(keys) =>
                                  handleNestedChange(
                                    [
                                      "storeZones",
                                      z,
                                      "zoneAisles",
                                      a,
                                      "aisleRacks",
                                      r,
                                      "rackLevels",
                                      i,
                                    ],
                                    "levelStatus"
                                  )([...keys][0])
                                }
                                isInvalid={!!errors.levelStatus}
                                errorMessage={errors.levelStatus}
                              >
                                <SelectItem key="Enable">Enable</SelectItem>
                                <SelectItem key="Disable">Disable</SelectItem>
                              </Select>
                            </div>
                          </div>

                          <div className="flex flex-col lg:flex-row items-end justify-end w-full p-2 gap-2">
                            <div className="flex items-center justify-center h-full p-2 gap-2">
                              <Button
                                onPress={() =>
                                  addNested(
                                    [
                                      "storeZones",
                                      z,
                                      "zoneAisles",
                                      a,
                                      "aisleRacks",
                                      r,
                                      "rackLevels",
                                      i,
                                      "levelBins",
                                    ],
                                    {
                                      binCode: "",
                                      binName: "",
                                      binDescription: "",
                                      binRow: "",
                                      binType: "",
                                      binUsage: "",
                                      binCapacity: "",
                                      binRfidTagId: "",
                                      binOccupancy: "",
                                      binFillRate: "",
                                      binPosX: "",
                                      binPosY: "",
                                      binWidth: "",
                                      binHeight: "",
                                      binDepth: "",
                                      binStatus: "",
                                    }
                                  )
                                }
                                color="warning"
                                radius="full"
                                className="w-full h-full p-3 gap-2"
                              >
                                + Bin
                              </Button>
                            </div>
                          </div>

                          {(lv.levelBins || []).map((b, k) => (
                            <div
                              key={k}
                              className="flex flex-col items-center justify-start w-full h-full gap-2"
                            >
                              <div className="flex flex-row items-center justify-center w-full p-2 gap-2">
                                <div className="flex items-center justify-start w-full h-full p-2 gap-2 font-semibold">
                                  Bin : {b.binCode || `#${k + 1}`}
                                </div>
                                <div className="flex items-center justify-center h-full p-2 gap-2">
                                  <Button
                                    onPress={() =>
                                      deleteNested(
                                        [
                                          "storeZones",
                                          z,
                                          "zoneAisles",
                                          a,
                                          "aisleRacks",
                                          r,
                                          "rackLevels",
                                          i,
                                          "levelBins",
                                        ],
                                        k
                                      )
                                    }
                                    color="danger"
                                    radius="full"
                                    className="w-full h-full p-3 gap-2"
                                  >
                                    🗑
                                  </Button>
                                </div>
                              </div>

                              <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
                                <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                                  <Input
                                    label="Bin Code"
                                    labelPlacement="outside"
                                    variant="bordered"
                                    radius="full"
                                    value={b.binCode || ""}
                                    onChange={handleNestedChange(
                                      [
                                        "storeZones",
                                        z,
                                        "zoneAisles",
                                        a,
                                        "aisleRacks",
                                        r,
                                        "rackLevels",
                                        i,
                                        "levelBins",
                                        k,
                                      ],
                                      "binCode"
                                    )}
                                    isInvalid={!!errors.binCode}
                                    errorMessage={errors.binCode}
                                  />
                                </div>
                                <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                                  <Input
                                    label="Bin Name"
                                    labelPlacement="outside"
                                    variant="bordered"
                                    radius="full"
                                    value={b.binName || ""}
                                    onChange={handleNestedChange(
                                      [
                                        "storeZones",
                                        z,
                                        "zoneAisles",
                                        a,
                                        "aisleRacks",
                                        r,
                                        "rackLevels",
                                        i,
                                        "levelBins",
                                        k,
                                      ],
                                      "binName"
                                    )}
                                    isInvalid={!!errors.binName}
                                    errorMessage={errors.binName}
                                  />
                                </div>
                              </div>

                              <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
                                <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                                  <Textarea
                                    label="Bin Description"
                                    labelPlacement="outside"
                                    variant="bordered"
                                    radius="full"
                                    value={b.binDescription || ""}
                                    onChange={handleNestedChange(
                                      [
                                        "storeZones",
                                        z,
                                        "zoneAisles",
                                        a,
                                        "aisleRacks",
                                        r,
                                        "rackLevels",
                                        i,
                                        "levelBins",
                                        k,
                                      ],
                                      "binDescription"
                                    )}
                                    isInvalid={!!errors.binDescription}
                                    errorMessage={errors.binDescription}
                                  />
                                </div>
                              </div>

                              <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
                                <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                                  <Input
                                    label="Row"
                                    labelPlacement="outside"
                                    variant="bordered"
                                    radius="full"
                                    value={b.binRow || ""}
                                    onChange={handleNestedChange(
                                      [
                                        "storeZones",
                                        z,
                                        "zoneAisles",
                                        a,
                                        "aisleRacks",
                                        r,
                                        "rackLevels",
                                        i,
                                        "levelBins",
                                        k,
                                      ],
                                      "binRow"
                                    )}
                                  />
                                </div>
                                <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                                  <Select
                                    label="Bin Type"
                                    labelPlacement="outside"
                                    placeholder="Please Select"
                                    variant="bordered"
                                    color="default"
                                    radius="full"
                                    selectedKeys={b.binType ? [b.binType] : []}
                                    onSelectionChange={(keys) =>
                                      handleNestedChange(
                                        [
                                          "storeZones",
                                          z,
                                          "zoneAisles",
                                          a,
                                          "aisleRacks",
                                          r,
                                          "rackLevels",
                                          i,
                                          "levelBins",
                                          k,
                                        ],
                                        "binType"
                                      )([...keys][0])
                                    }
                                    isInvalid={!!errors.binType}
                                    errorMessage={errors.binType}
                                  >
                                    <SelectItem key="Standard">
                                      Standard
                                    </SelectItem>
                                    <SelectItem key="Pallet">Pallet</SelectItem>
                                    <SelectItem key="Shelf">Shelf</SelectItem>
                                    <SelectItem key="Drawer">Drawer</SelectItem>
                                    <SelectItem key="Container">
                                      Container
                                    </SelectItem>
                                    <SelectItem key="Bulk">Bulk</SelectItem>
                                    <SelectItem key="ColdStorage">
                                      ColdStorage
                                    </SelectItem>
                                    <SelectItem key="Hazmat">Hazmat</SelectItem>
                                  </Select>
                                </div>
                                <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                                  <Select
                                    label="Bin Usage"
                                    labelPlacement="outside"
                                    placeholder="Please Select"
                                    variant="bordered"
                                    color="default"
                                    radius="full"
                                    selectedKeys={
                                      b.binUsage ? [b.binUsage] : []
                                    }
                                    onSelectionChange={(keys) =>
                                      handleNestedChange(
                                        [
                                          "storeZones",
                                          z,
                                          "zoneAisles",
                                          a,
                                          "aisleRacks",
                                          r,
                                          "rackLevels",
                                          i,
                                          "levelBins",
                                          k,
                                        ],
                                        "binUsage"
                                      )([...keys][0])
                                    }
                                    isInvalid={!!errors.binUsage}
                                    errorMessage={errors.binUsage}
                                  >
                                    <SelectItem key="Picking">
                                      Picking
                                    </SelectItem>
                                    <SelectItem key="Storage">
                                      Storage
                                    </SelectItem>
                                    <SelectItem key="Buffer">Buffer</SelectItem>
                                    <SelectItem key="Inbound">
                                      Inbound
                                    </SelectItem>
                                    <SelectItem key="Outbound">
                                      Outbound
                                    </SelectItem>
                                    <SelectItem key="Return">Return</SelectItem>
                                    <SelectItem key="QC">QC</SelectItem>
                                    <SelectItem key="Quarantine">
                                      Quarantine
                                    </SelectItem>
                                  </Select>
                                </div>
                              </div>

                              <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
                                <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                                  <Input
                                    type="number"
                                    label="Capacity"
                                    labelPlacement="outside"
                                    variant="bordered"
                                    radius="full"
                                    value={b.binCapacity || ""}
                                    onChange={handleNestedChange(
                                      [
                                        "storeZones",
                                        z,
                                        "zoneAisles",
                                        a,
                                        "aisleRacks",
                                        r,
                                        "rackLevels",
                                        i,
                                        "levelBins",
                                        k,
                                      ],
                                      "binCapacity"
                                    )}
                                  />
                                </div>
                                <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                                  <Input
                                    label="RFID Tag"
                                    labelPlacement="outside"
                                    variant="bordered"
                                    radius="full"
                                    value={b.binRfidTagId || ""}
                                    onChange={handleNestedChange(
                                      [
                                        "storeZones",
                                        z,
                                        "zoneAisles",
                                        a,
                                        "aisleRacks",
                                        r,
                                        "rackLevels",
                                        i,
                                        "levelBins",
                                        k,
                                      ],
                                      "binRfidTagId"
                                    )}
                                    isInvalid={!!errors.binRfidTagId}
                                    errorMessage={errors.binRfidTagId}
                                  />
                                </div>
                                <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                                  <Select
                                    label="Occupancy"
                                    labelPlacement="outside"
                                    variant="bordered"
                                    radius="full"
                                    selectedKeys={
                                      b.binOccupancy ? [b.binOccupancy] : []
                                    }
                                    onSelectionChange={(keys) =>
                                      handleNestedChange(
                                        [
                                          "storeZones",
                                          z,
                                          "zoneAisles",
                                          a,
                                          "aisleRacks",
                                          r,
                                          "rackLevels",
                                          i,
                                          "levelBins",
                                          k,
                                        ],
                                        "binOccupancy"
                                      )([...keys][0])
                                    }
                                  >
                                    <SelectItem key="Empty">Empty</SelectItem>
                                    <SelectItem key="Partial">
                                      Partial
                                    </SelectItem>
                                    <SelectItem key="Full">Full</SelectItem>
                                    <SelectItem key="Reserved">
                                      Reserved
                                    </SelectItem>
                                  </Select>
                                </div>
                              </div>

                              <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
                                <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                                  <Input
                                    type="number"
                                    label="Fill Rate"
                                    labelPlacement="outside"
                                    variant="bordered"
                                    radius="full"
                                    value={b.binFillRate || ""}
                                    onChange={handleNestedChange(
                                      [
                                        "storeZones",
                                        z,
                                        "zoneAisles",
                                        a,
                                        "aisleRacks",
                                        r,
                                        "rackLevels",
                                        i,
                                        "levelBins",
                                        k,
                                      ],
                                      "binFillRate"
                                    )}
                                  />
                                </div>
                                <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                                  <Input
                                    type="number"
                                    label="PosX"
                                    labelPlacement="outside"
                                    variant="bordered"
                                    radius="full"
                                    value={b.binPosX || ""}
                                    onChange={handleNestedChange(
                                      [
                                        "storeZones",
                                        z,
                                        "zoneAisles",
                                        a,
                                        "aisleRacks",
                                        r,
                                        "rackLevels",
                                        i,
                                        "levelBins",
                                        k,
                                      ],
                                      "binPosX"
                                    )}
                                  />
                                </div>
                                <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                                  <Input
                                    type="number"
                                    label="PosY"
                                    labelPlacement="outside"
                                    variant="bordered"
                                    radius="full"
                                    value={b.binPosY || ""}
                                    onChange={handleNestedChange(
                                      [
                                        "storeZones",
                                        z,
                                        "zoneAisles",
                                        a,
                                        "aisleRacks",
                                        r,
                                        "rackLevels",
                                        i,
                                        "levelBins",
                                        k,
                                      ],
                                      "binPosY"
                                    )}
                                  />
                                </div>
                              </div>

                              <div className="flex flex-col lg:flex-row items-center justify-center w-full p-2 gap-2">
                                <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                                  <Input
                                    type="number"
                                    label="Width"
                                    labelPlacement="outside"
                                    variant="bordered"
                                    radius="full"
                                    value={b.binWidth || ""}
                                    onChange={handleNestedChange(
                                      [
                                        "storeZones",
                                        z,
                                        "zoneAisles",
                                        a,
                                        "aisleRacks",
                                        r,
                                        "rackLevels",
                                        i,
                                        "levelBins",
                                        k,
                                      ],
                                      "binWidth"
                                    )}
                                  />
                                </div>
                                <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                                  <Input
                                    type="number"
                                    label="Height"
                                    labelPlacement="outside"
                                    variant="bordered"
                                    radius="full"
                                    value={b.binHeight || ""}
                                    onChange={handleNestedChange(
                                      [
                                        "storeZones",
                                        z,
                                        "zoneAisles",
                                        a,
                                        "aisleRacks",
                                        r,
                                        "rackLevels",
                                        i,
                                        "levelBins",
                                        k,
                                      ],
                                      "binHeight"
                                    )}
                                  />
                                </div>
                                <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                                  <Input
                                    type="number"
                                    label="Depth"
                                    labelPlacement="outside"
                                    variant="bordered"
                                    radius="full"
                                    value={b.binDepth || ""}
                                    onChange={handleNestedChange(
                                      [
                                        "storeZones",
                                        z,
                                        "zoneAisles",
                                        a,
                                        "aisleRacks",
                                        r,
                                        "rackLevels",
                                        i,
                                        "levelBins",
                                        k,
                                      ],
                                      "binDepth"
                                    )}
                                  />
                                </div>
                              </div>

                              <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                                <Select
                                  label="Bin Status"
                                  labelPlacement="outside"
                                  variant="bordered"
                                  radius="full"
                                  selectedKeys={
                                    b.binStatus ? [b.binStatus] : []
                                  }
                                  onSelectionChange={(keys) =>
                                    handleNestedChange(
                                      [
                                        "storeZones",
                                        z,
                                        "zoneAisles",
                                        a,
                                        "aisleRacks",
                                        r,
                                        "rackLevels",
                                        i,
                                        "levelBins",
                                        k,
                                      ],
                                      "binStatus"
                                    )([...keys][0])
                                  }
                                >
                                  <SelectItem key="Enable">Enable</SelectItem>
                                  <SelectItem key="Disable">Disable</SelectItem>
                                </Select>
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
              value={operatedBy || ""}
            />
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
